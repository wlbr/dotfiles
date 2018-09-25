"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const config_1 = require("../config");
const consts_1 = require("../consts");
const items_1 = require("../todo/items");
const ast_1 = require("./ast");
const time_1 = require("./time");
/* STATISTICS */
const Statistics = {
    /* ESTIMATE */
    estimate: {
        estimates: {},
        parse(str, from) {
            if (Statistics.estimate.estimates[str])
                return Statistics.estimate.estimates[str];
            const est = str.match(consts_1.default.regexes.tagEstimate);
            if (!est)
                return 0;
            const time = est[2] || est[1], seconds = time_1.default.diffSeconds(time, from);
            Statistics.estimate.estimates[str] = seconds;
            return seconds;
        }
    },
    /* CONDITION */
    condition: {
        functions: {},
        toFunction(condition) {
            if (Statistics.condition.functions[condition])
                return Statistics.condition.functions[condition];
            const fn = new Function('global', 'project', `return ${condition}`);
            Statistics.condition.functions[condition] = fn;
            return fn;
        },
        is(condition, globalTokens, projectTokens) {
            if (_.isBoolean(condition))
                return condition;
            if (!globalTokens && !projectTokens)
                return false;
            const fn = Statistics.condition.toFunction(condition);
            try {
                return !!fn(globalTokens, projectTokens);
            }
            catch (e) {
                return false;
            }
        }
    },
    /* TOKENS */
    tokens: {
        global: {},
        updateGlobal(items) {
            if (items.archive && config_1.default.getKey('statistics.statusbar.ignoreArchive')) { // Keeping only items before the archive
                items = _.reduce(items, (acc, value, key) => {
                    const newValue = _.isArray(value) ? value.filter(item => item.lineNumber < items.archive.lineNumber) : value;
                    acc[key] = newValue;
                    return acc;
                }, {});
            }
            const tokens = {
                comments: items.comments.length,
                projects: items.projects.length,
                tags: items.tags.length,
                pending: items.todosBox.length,
                done: items.todosDone.length,
                cancelled: items.todosCancelled.length,
                estSeconds: _.sum(items.tags.map(tag => Statistics.estimate.parse(tag.text)))
            };
            tokens.finished = tokens.done + tokens.cancelled;
            tokens.all = tokens.pending + tokens.done + tokens.cancelled;
            tokens.percentage = tokens.all ? Math.round(tokens.finished / tokens.all * 100) : 100;
            tokens.est = tokens.estSeconds ? time_1.default.diff(Date.now() + (tokens.estSeconds * 1000), undefined, config_1.default.getKey('timekeeping.estimate.format')) : '';
            Statistics.tokens.global = tokens;
        },
        projects: {},
        updateProjects(items) {
            Statistics.tokens.projects = {};
            if (!items.projects)
                return;
            function mergeSorted(arr1, arr2) {
                const merged = new Array(arr1.length + arr2.length);
                let i = arr1.length - 1, j = arr2.length - 1, k = merged.length;
                while (k) {
                    merged[--k] = (j < 0 || (i >= 0 && arr1[i].lineNumber > arr2[j].lineNumber)) ? arr1[i--] : arr2[j--];
                }
                return merged;
            }
            const groups = [items.projects, items.todosBox, items.todosDone, items.todosCancelled, items.tags.length >= 500 ? [] : items.tags], //TODO: Undocumented, uncustomizable limitation regarding tags
            lines = groups.reduce((arr1, arr2) => mergeSorted(arr1, arr2));
            items.projects.forEach(project => {
                Statistics.tokens.updateProject(project, lines, lines.indexOf(project));
            });
        },
        updateProject(project, lines, lineNr) {
            if (Statistics.tokens.projects[project.lineNumber])
                return Statistics.tokens.projects[project.lineNumber];
            project.level = (project.level || ast_1.default.getLevel(project.line.text));
            const tokens = {
                comments: 0,
                projects: 0,
                tags: 0,
                pending: 0,
                done: 0,
                cancelled: 0,
                estSeconds: 0
            };
            let wasPending = false;
            for (let i = lineNr + 1, l = lines.length; i < l; i++) {
                const nextItem = lines[i];
                if (nextItem instanceof items_1.Tag) {
                    tokens.tags++;
                    if (!wasPending)
                        continue;
                    tokens.estSeconds += Statistics.estimate.parse(nextItem.text);
                }
                else {
                    nextItem.level = (nextItem.level || ast_1.default.getLevel(nextItem.line.text));
                    if (nextItem.level <= project.level)
                        break;
                    wasPending = nextItem instanceof items_1.TodoBox;
                    if (nextItem instanceof items_1.Project) {
                        const nextTokens = Statistics.tokens.updateProject(nextItem, lines, i);
                        tokens.comments += nextTokens.comments;
                        tokens.projects += 1 + nextTokens.projects;
                        tokens.tags += nextTokens.tags;
                        tokens.pending += nextTokens.pending;
                        tokens.done += nextTokens.done;
                        tokens.cancelled += nextTokens.cancelled;
                        tokens.estSeconds += nextTokens.estSeconds;
                        i += nextTokens.comments + nextTokens.projects + nextTokens.tags + nextTokens.pending + nextTokens.done + nextTokens.cancelled; // Jumping
                    }
                    if (nextItem instanceof items_1.Comment) {
                        tokens.comments++;
                    }
                    else if (nextItem instanceof items_1.TodoBox) {
                        tokens.pending++;
                    }
                    else if (nextItem instanceof items_1.TodoDone) {
                        tokens.done++;
                    }
                    else if (nextItem instanceof items_1.TodoCancelled) {
                        tokens.cancelled++;
                    }
                }
            }
            tokens.finished = tokens.done + tokens.cancelled;
            tokens.all = tokens.pending + tokens.done + tokens.cancelled;
            tokens.percentage = tokens.all ? Math.round(tokens.finished / tokens.all * 100) : 100;
            tokens.est = tokens.estSeconds ? time_1.default.diff(Date.now() + (tokens.estSeconds * 1000), undefined, config_1.default.getKey('timekeeping.estimate.format')) : '';
            Statistics.tokens.projects[project.lineNumber] = tokens;
            return tokens;
        }
    },
    /* TEMPLATE */
    template: {
        tokensRe: {},
        getTokenRe(token) {
            if (Statistics.template.tokensRe[token])
                return Statistics.template.tokensRe[token];
            const re = new RegExp(`\\[${_.escapeRegExp(token)}\\]`, 'g');
            Statistics.template.tokensRe[token] = re;
            return re;
        },
        render(template, tokens = Statistics.getTokens()) {
            if (!tokens)
                return;
            for (let token in tokens) {
                const re = Statistics.template.getTokenRe(token);
                template = template.replace(re, tokens[token]);
            }
            return template;
        }
    }
};
/* EXPORT */
exports.default = Statistics;
//# sourceMappingURL=statistics.js.map
"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const config_1 = require("./config");
/* CONSTS */
const Consts = {
    get() {
        const archiveName = config_1.default.getKey('archive.name') || 'Archive', tagsNames = config_1.default.getKey('tags.names');
        return {
            languageId: 'todo',
            indentation: config_1.default.getKey('indentation'),
            timer: config_1.default.getKey('timer.statusbar.enabled'),
            symbols: {
                project: ':',
                box: config_1.default.getKey('symbols.box'),
                done: config_1.default.getKey('symbols.done'),
                cancelled: config_1.default.getKey('symbols.cancelled'),
                tag: '@'
            },
            colors: {
                done: config_1.default.getKey('colors.done'),
                cancelled: config_1.default.getKey('colors.cancelled'),
                code: config_1.default.getKey('colors.code'),
                comment: config_1.default.getKey('colors.comment'),
                project: config_1.default.getKey('colors.project'),
                projectStatistics: config_1.default.getKey('colors.projectStatistics'),
                tag: config_1.default.getKey('colors.tag'),
                types: _.transform(config_1.default.getKey('colors.types'), (acc, val, key) => { acc[key.toUpperCase()] = val; }, {})
            },
            tags: {
                names: config_1.default.getKey('tags.names'),
                backgroundColors: config_1.default.getKey('tags.backgroundColors'),
                foregroundColors: config_1.default.getKey('tags.foregroundColors')
            },
            regexes: {
                impossible: /(?=a)b/gm,
                empty: /^\s*$/,
                todo: /^[^\S\n]*((?!--|––|——)(?:[-❍❑■⬜□☐▪▫–—≡→›✘xX✔✓☑+]|\[[ xX+-]?\])\s[^\n]*)/gm,
                todoSymbol: /^[^\S\n]*(?!--|––|——)([-❍❑■⬜□☐▪▫–—≡→›✘xX✔✓☑+]|\[[ xX+-]?\])\s/,
                todoBox: /^[^\S\n]*((?!--|––|——)(?:[-❍❑■⬜□☐▪▫–—≡→›]|\[ ?\])\s(?![^\n]*[^a-zA-Z0-9]@(?:done|cancelled)(?:(?:\([^)]*\))|(?![a-zA-Z])))[^\n]*)/gm,
                todoBoxStarted: /^[^\S\n]*((?!--|––|——)(?:[-❍❑■⬜□☐▪▫–—≡→›]|\[ ?\])\s(?=[^\n]*[^a-zA-Z0-9]@started(?:(?:\([^)]*\))|(?![a-zA-Z])))[^\n]*)/gm,
                todoDone: /^[^\S\n]*((?!--|––|——)(?:(?:(?:[✔✓☑+]|\[[xX+]\])\s[^\n]*)|(?:(?:[-❍❑■⬜□☐▪▫–—≡→›]|\[ ?\])\s[^\n]*[^a-zA-Z0-9]@done(?:(?:\([^)]*\))|(?![a-zA-Z]))[^\n]*)))/gm,
                todoCancelled: /^[^\S\n]*((?!--|––|——)(?:(?:(?:[✘xX]|\[-\])\s[^\n]*)|(?:(?:[-❍❑■⬜□☐▪▫–—≡→›]|\[ ?\])\s[^\n]*[^a-zA-Z0-9]@cancelled(?:(?:\([^)]*\))|(?![a-zA-Z]))[^\n]*)))/gm,
                todoEmbedded: new RegExp(config_1.default.getKey('embedded.regex'), config_1.default.getKey('embedded.regexFlags')),
                project: /^(?![^\S\n]*(?!--|––|——)(?:[-❍❑■⬜□☐▪▫–—≡→›✘xX✔✓☑+]|\[[ xX+-]?\])\s[^\n]*)[^\S\n]*(.+:)[^\S\n]*(?:(?=@[^\s*~(]+(?:\([^)]*\))?)|$)/gm,
                projectParts: /(\s*)([^:]+):(.*)/,
                archive: new RegExp(`^(?![^\\S\\n]*(?!--|––|——)(?:[-❍❑■⬜□☐▪▫–—≡→›✘xX✔✓☑+]|\\[[ xX+-]?\\])\\s[^\\n]*)([^\\S\\n]*${_.escapeRegExp(archiveName)}:.*$)`, 'gm'),
                comment: /^(?!\s*$)(?![^\S\n]*(?!--|––|——)(?:[-❍❑■⬜□☐▪▫–—≡→›✘xX✔✓☑+]|\[[ xX+-]?\])\s[^\n]*)(?![^\S\n]*.+:[^\S\n]*(?:(?=@[^\s*~(]+(?:\([^)]*\))?)|$))[^\S\n]*([^\n]+)/gm,
                tag: /(?:^|[^a-zA-Z0-9`])(@[^\s*~(]+(?:\([^)]*\))?)/gm,
                tagSpecial: new RegExp(`(?:^|[^a-zA-Z0-9])@(${tagsNames.map(n => _.escapeRegExp(n)).join('|')})(?:(?:\\([^)]*\\))|(?![a-zA-Z]))`, 'gm'),
                tagSpecialNormal: new RegExp(`(?:^|[^a-zA-Z0-9])(?:${tagsNames.map(n => `(@${_.escapeRegExp(n)}(?:(?:\\([^)]*\\))|(?![a-zA-Z])))`).join('|')}|(@[^\\s*~(]+(?:(?:\\([^)]*\\))|(?![a-zA-Z]))))`, 'gm'),
                tagNormal: new RegExp(`(?:^|[^a-zA-Z0-9])@(?!${tagsNames.map(n => _.escapeRegExp(n)).join('|')}|created|done|cancelled|started|lasted|wasted|est|\\d)[^\\s*~(]+(?:\\([^)]*\\))?`),
                tagCreated: /(?:^|[^a-zA-Z0-9])@created(?:(?:\(([^)]*)\))|(?![a-zA-Z]))/,
                tagStarted: /(?:^|[^a-zA-Z0-9])@started(?:(?:\(([^)]*)\))|(?![a-zA-Z]))/,
                tagFinished: /(?:^|[^a-zA-Z0-9])@(?:done|cancelled)(?:(?:\(([^)]*)\))|(?![a-zA-Z]))/,
                tagElapsed: /(?:^|[^a-zA-Z0-9])@(?:lasted|wasted)(?:(?:\(([^)]*)\))|(?![a-zA-Z]))/,
                tagEstimate: /(?:^|[^a-zA-Z0-9])@est\(([^)]*)\)|@(\d\S+)/,
                formatted: /(?:^|[^a-zA-Z0-9])(?:(`[^\n`]*`)|(\*[^\n*]+\*)|(_[^\n_]+_)|(~[^\n~]+~))(?![a-zA-Z])/gm,
                formattedCode: /(?:^|[^a-zA-Z0-9])(`[^\n`]*`)(?![a-zA-Z])/gm,
                formattedBold: /(?:^|[^a-zA-Z0-9])(\*[^\n*]+\*)(?![a-zA-Z])/gm,
                formattedItalic: /(?:^|[^a-zA-Z0-9])(_[^\n_]+_)(?![a-zA-Z])/gm,
                formattedStrikethrough: /(?:^|[^a-zA-Z0-9])(~[^\n~]+~)(?![a-zA-Z])/gm
            }
        };
    },
    update() {
        _.merge(Consts, Consts.get());
    }
};
Consts.update();
/* EXPORT */
exports.default = Consts;
//# sourceMappingURL=consts.js.map
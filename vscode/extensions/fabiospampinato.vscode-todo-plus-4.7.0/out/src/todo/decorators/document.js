"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const vscode = require("vscode");
const config_1 = require("../../config");
const utils_1 = require("../../utils");
const item_1 = require("../items/item");
const document_1 = require("../document");
const comment_1 = require("./comment");
const formatted_1 = require("./formatted");
const project_1 = require("./project");
const tag_1 = require("./tag");
const todo_done_1 = require("./todo_done");
const todo_cancelled_1 = require("./todo_cancelled");
/* DOCUMENTS LINES CACHE */
const DocumentsLinesCache = {
    lines: {},
    get(textEditor, lineNr) {
        const id = textEditor['id'], lines = DocumentsLinesCache.lines[id];
        return lines && _.isNumber(lineNr) ? lines[lineNr] : lines;
    },
    update(textEditor) {
        const id = textEditor['id'];
        DocumentsLinesCache.lines[id] = textEditor.document.getText().split('\n');
    },
    didChange(doc) {
        const prevLines = DocumentsLinesCache.get(doc.textEditor);
        if (prevLines) {
            const prevText = prevLines.join('\n'), currText = doc.textDocument.getText();
            if (prevText === currText)
                return false;
        }
        return true;
    }
};
/* DOCUMENT */
const Document = {
    /* UPDATE */
    update(res = vscode.window.activeTextEditor, force = false) {
        const statisticsStatusbar = config_1.default.getKey('statistics.statusbar.enabled') !== false, statisticsProjects = config_1.default.getKey('statistics.project.enabled') !== false;
        if (res) {
            const doc = new document_1.default(res);
            if (doc.isSupported()) {
                // if ( !force && !DocumentsLinesCache.didChange ( doc ) ) return; //FIXME: Decorations might get trashed, so we can't skip this work //URL: https://github.com/Microsoft/vscode/issues/50415
                DocumentsLinesCache.update(doc.textEditor);
                const items = Document.getItems(doc);
                if (statisticsStatusbar || statisticsProjects) {
                    utils_1.default.statistics.tokens.updateGlobal(items);
                }
                if (statisticsProjects) {
                    utils_1.default.statistics.tokens.updateProjects(items);
                }
                const decorations = Document.getItemsDecorations(items);
                decorations.forEach(({ type, ranges }) => {
                    doc.textEditor.setDecorations(type, ranges);
                });
                const StatusbarTimer = require('../../statusbars/timer').default; // Avoiding a cyclic dependency
                StatusbarTimer.update(doc);
            }
        }
        if (statisticsStatusbar) {
            const StatusbarStatistics = require('../../statusbars/statistics').default; // Avoiding a cyclic dependency
            StatusbarStatistics.update();
        }
    },
    updateLines(res = vscode.window.activeTextEditor, lineNrs) {
        // This should optimize these scenarios:
        // 1. No items at all
        // 2. Same items but with same ranges
        // 3. Same items but both ranging through the entire line
        // 4. Same items but both ranging through the entire line, with some other items before the end
        const doc = new document_1.default(res);
        if (!doc.isSupported())
            return;
        const prevLines = DocumentsLinesCache.get(doc.textEditor);
        if (prevLines && prevLines.length === doc.textDocument.lineCount) {
            lineNrs = _.uniq(lineNrs); // Multiple cursors on the same line
            const isUnchanged = lineNrs.every(lineNr => {
                const prevLine = prevLines[lineNr], prevDoc = new document_1.default(prevLine), prevItems = Document.getItems(prevDoc), //TSC
                currLine = doc.textDocument.lineAt(lineNr).text, currDoc = new document_1.default(currLine), currItems = Document.getItems(currDoc); //TSC
                return _.isEqualWith(prevItems, currItems, (prevItem, currItem) => {
                    if (prevItem instanceof item_1.default && currItem instanceof item_1.default) {
                        return (prevItem.matchRange.start === currItem.matchRange.start && (prevItem.matchRange.end === currItem.matchRange.end || (_.trim(prevItem.match.input) === _.trim(prevItem.text) && (_.trim(currItem.match.input) === _.trim(currItem.text) && !_.find(currItems, items => _.isArray(items) && items.find(item => item !== currItem && _.trim(currItem.text).endsWith(item.text))))))); //TODO: Write it better
                    }
                });
            });
            if (isUnchanged)
                return;
        }
        Document.update(res, true);
    },
    /* ITEMS */
    getItems(doc) {
        return {
            archive: doc.getArchive(),
            comments: doc.getComments(),
            formatted: config_1.default.getKey('formatting.enabled') ? doc.getFormatted() : [],
            projects: doc.getProjects(),
            tags: doc.getTags(),
            todosBox: doc.getTodosBox(),
            todosDone: doc.getTodosDone(),
            todosCancelled: doc.getTodosCancelled()
        };
    },
    getItemsDecorations(items) {
        return _.concat(new comment_1.default().getDecorations(items.comments), new formatted_1.default().getDecorations(items.formatted), new tag_1.default().getDecorations(items.tags), new project_1.default().getDecorations(items.projects), new todo_done_1.default().getDecorations(items.todosDone), new todo_cancelled_1.default().getDecorations(items.todosCancelled));
    }
};
/* EXPORT */
exports.default = Document;
//# sourceMappingURL=document.js.map
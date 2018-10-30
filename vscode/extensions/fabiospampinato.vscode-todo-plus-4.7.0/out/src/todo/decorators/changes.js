"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../../consts");
const document_1 = require("./document");
/* CHANGES */
const Changes = {
    changes: [],
    onChanges({ document, contentChanges }) {
        if (document.languageId !== consts_1.default.languageId)
            return;
        if (!contentChanges.length)
            return; //URL: https://github.com/Microsoft/vscode/issues/50344
        Changes.changes.push(...contentChanges);
        Changes.decorate(document);
    },
    decorate(document) {
        const areSingleLines = Changes.changes.every(({ range }) => range.isSingleLine);
        if (areSingleLines) {
            const lineNrs = Changes.changes.map(({ range }) => range.start.line);
            document_1.default.updateLines(document, lineNrs);
        }
        else {
            document_1.default.update(document);
        }
        Changes.changes = [];
    }
};
/* EXPORT */
exports.default = Changes;
//# sourceMappingURL=changes.js.map
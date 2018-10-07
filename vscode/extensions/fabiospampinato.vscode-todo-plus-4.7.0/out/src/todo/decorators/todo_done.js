"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const consts_1 = require("../../consts");
const line_1 = require("./line");
/* DECORATION TYPES */
const TODO_DONE = vscode.window.createTextEditorDecorationType({
    color: consts_1.default.colors.done,
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedOpen
});
/* TODO DONE */
class TodoDone extends line_1.default {
    constructor() {
        super(...arguments);
        this.TYPES = [TODO_DONE];
    }
    getItemRanges(todoDone, negRange) {
        return [this.getRangeDifference(todoDone.text, todoDone.range, negRange || [consts_1.default.regexes.tag, consts_1.default.regexes.formattedCode])];
    }
}
/* EXPORT */
exports.default = TodoDone;
//# sourceMappingURL=todo_done.js.map
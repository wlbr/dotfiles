"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const consts_1 = require("../../consts");
const line_1 = require("./line");
/* DECORATION TYPES */
const TODO_CANCELLED = vscode.window.createTextEditorDecorationType({
    color: consts_1.default.colors.cancelled,
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedOpen
});
/* TODO CANCELLED */
class TodoCancelled extends line_1.default {
    constructor() {
        super(...arguments);
        this.TYPES = [TODO_CANCELLED];
    }
    getItemRanges(todoCancelled, negRange) {
        return [this.getRangeDifference(todoCancelled.text, todoCancelled.range, negRange || [consts_1.default.regexes.tag, consts_1.default.regexes.formattedCode])];
    }
}
/* EXPORT */
exports.default = TodoCancelled;
//# sourceMappingURL=todo_cancelled.js.map
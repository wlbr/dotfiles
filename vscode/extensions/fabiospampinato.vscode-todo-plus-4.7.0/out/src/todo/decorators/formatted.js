"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const consts_1 = require("../../consts");
const line_1 = require("./line");
/* DECORATION TYPES */
const CODE = vscode.window.createTextEditorDecorationType({
    color: consts_1.default.colors.code,
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
});
const BOLD = vscode.window.createTextEditorDecorationType({
    fontWeight: 'bold',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
});
const ITALIC = vscode.window.createTextEditorDecorationType({
    fontStyle: 'oblique',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
});
const STRIKETHROUGH = vscode.window.createTextEditorDecorationType({
    textDecoration: 'line-through',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
});
/* FORMATTED */
class Formatted extends line_1.default {
    constructor() {
        super(...arguments);
        this.TYPES = [CODE, BOLD, ITALIC, STRIKETHROUGH];
    }
    getItemRanges(formatted) {
        return this.TYPES.map((type, index) => formatted.match[index + 1] && [formatted.range]);
    }
}
/* EXPORT */
exports.default = Formatted;
//# sourceMappingURL=formatted.js.map
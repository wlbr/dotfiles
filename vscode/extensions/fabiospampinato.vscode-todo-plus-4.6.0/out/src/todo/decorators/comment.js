"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const line_1 = require("./line");
const consts_1 = require("../../consts");
/* DECORATION TYPES */
const COMMENT = vscode.window.createTextEditorDecorationType({
    color: consts_1.default.colors.comment,
    rangeBehavior: vscode.DecorationRangeBehavior.OpenOpen
});
/* COMMENT */
class Comment extends line_1.default {
    constructor() {
        super(...arguments);
        this.TYPES = [COMMENT];
    }
    getItemRanges(comment, negRange) {
        return [this.getRangeDifference(comment.text, comment.range, negRange || [consts_1.default.regexes.tag, consts_1.default.regexes.formattedCode])];
    }
}
/* EXPORT */
exports.default = Comment;
//# sourceMappingURL=comment.js.map
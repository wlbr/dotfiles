"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const consts_1 = require("../../consts");
const line_1 = require("./line");
/* DECORATION TYPES */
const SPECIAL_TAGS = consts_1.default.tags.names.map((name, index) => vscode.window.createTextEditorDecorationType({
    backgroundColor: consts_1.default.tags.backgroundColors[index],
    color: consts_1.default.tags.foregroundColors[index],
    borderRadius: '2px',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
}));
const TAG = vscode.window.createTextEditorDecorationType({
    color: consts_1.default.colors.tag,
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
});
/* TAG */
class Tag extends line_1.default {
    constructor() {
        super(...arguments);
        this.TYPES = [...SPECIAL_TAGS, TAG];
    }
    getItemRanges(tag) {
        //FIXME: We are purposely not supporting tags inside code blocks, it's an uncommon case, we'll just be wasting some performance
        // this.TYPES.map ( ( type, index ) => tag.match[index + 1] && this.getRangeDifference ( tag.text, tag.range, [Consts.regexes.formattedCode] ) );
        return this.TYPES.map((type, index) => tag.match[index + 1] && tag.range);
    }
}
/* EXPORT */
exports.default = Tag;
//# sourceMappingURL=tag.js.map
"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const vscode = require("vscode");
const utils_1 = require("../../utils");
/* ITEM */
class Item {
    /* GETTERS */ // For performance reasons, trying to lazily evaluate as much as possible
    get line() {
        if (!_.isUndefined(this._line))
            return this._line;
        return this._line = (this.textDocument && this.matchRange ? this.textDocument.lineAt(this.lineNumber) : null);
    }
    get lineNumber() {
        if (!_.isUndefined(this._pos))
            return this._pos.line;
        this._pos = this.textDocument.positionAt(this.matchRange.start);
        return this._pos.line;
    }
    get matchRange() {
        if (!_.isUndefined(this._matchRange))
            return this._matchRange;
        return this._matchRange = (this.match ? utils_1.default.regex.match2range(this.match) : null);
    }
    get range() {
        if (!_.isUndefined(this._range))
            return this._range;
        if (this.matchRange && this.lineNumber >= 0) {
            return this._range = new vscode.Range(this._pos, new vscode.Position(this._pos.line, this._pos.character + (this.matchRange.end - this.matchRange.start)));
        }
        else if (this.line) {
            return this._range = this.line.range;
        }
        else {
            return this._range = null;
        }
    }
    get text() {
        if (!_.isUndefined(this._text))
            return this._text;
        return this._text = (this.match ? _.findLast(this.match, _.isString) : (this.line ? this.line.text : ''));
    }
    /* CONSTRUCTOR */
    constructor(textEditor, line, match) {
        this.textEditor = textEditor || null;
        this.textDocument = this.textEditor ? textEditor.document : null;
        this._line = line;
        this.match = match;
    }
    /* IS */
    static is(str, regex) {
        return utils_1.default.regex.test(regex, str);
    }
}
/* EXPORT */
exports.default = Item;
//# sourceMappingURL=item.js.map
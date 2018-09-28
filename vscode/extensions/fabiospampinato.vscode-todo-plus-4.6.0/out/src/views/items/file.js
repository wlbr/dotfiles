"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const group_1 = require("./group");
/* FILE */
class File extends group_1.default {
    constructor(obj, uri) {
        super(obj, uri.label);
        this.contextValue = 'file';
        this.iconPath = vscode.ThemeIcon.File;
        this.resourceUri = uri;
    }
}
/* EXPORT */
exports.default = File;
//# sourceMappingURL=file.js.map
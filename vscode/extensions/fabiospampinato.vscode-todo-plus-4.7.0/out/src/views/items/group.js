"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const item_1 = require("./item");
/* GROUP */
class Group extends item_1.default {
    constructor(obj, label, icon = false) {
        super(obj, label, vscode.TreeItemCollapsibleState.Expanded);
        this.contextValue = 'group';
        if (icon) {
            const type = label.toUpperCase();
            this.setTypeIcon(type);
            if (this.iconPath) {
                this.label = type;
            }
        }
    }
}
/* EXPORT */
exports.default = Group;
//# sourceMappingURL=group.js.map
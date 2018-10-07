"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const utils_1 = require("../../utils");
/* ITEM */
class Item extends vscode.TreeItem {
    constructor(obj, label, collapsibleState = vscode.TreeItemCollapsibleState.None) {
        super(label, collapsibleState);
        this.contextValue = 'item';
        this.obj = obj;
    }
    setTypeIcon(type) {
        const iconPath = utils_1.default.view.getTypeIcon(type);
        if (iconPath) {
            this.iconPath = iconPath;
        }
    }
}
/* EXPORT */
exports.default = Item;
//# sourceMappingURL=item.js.map
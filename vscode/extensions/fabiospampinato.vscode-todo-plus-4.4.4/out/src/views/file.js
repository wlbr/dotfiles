"use strict";
/* IMPORT */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const vscode = require("vscode");
const utils_1 = require("../utils");
const file_1 = require("./items/file");
const group_1 = require("./items/group");
const placeholder_1 = require("./items/placeholder");
const todo_1 = require("./items/todo");
const view_1 = require("./view");
/* FILES */
//TODO: Collapse/Expand without rebuilding the tree https://github.com/Microsoft/vscode/issues/54192
class Files extends view_1.default {
    constructor() {
        super(...arguments);
        this.id = 'todo.views.1file';
        this.clear = false;
        this.expanded = false;
        this.directorySepRe = /\\|\//;
    }
    getTreeItem(item) {
        if (item.collapsibleState !== vscode.TreeItemCollapsibleState.None) {
            item.collapsibleState = this.expanded ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.Collapsed;
        }
        return item;
    }
    getChildren(item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.clear) {
                setTimeout(this.refresh.bind(this), 0);
                return [];
            }
            let obj = item ? item.obj : yield utils_1.default.files.get();
            if (_.isEmpty(obj))
                return [new placeholder_1.default('No todo files found')];
            while (obj[''])
                obj = obj['']; // Collpsing unnecessary groups
            if (obj.textEditor) {
                const items = [], lineNr = obj.hasOwnProperty('lineNr') ? obj.lineNr : -1;
                utils_1.default.ast.walkChildren(obj.textEditor, lineNr, data => {
                    data.textEditor = obj.textEditor;
                    data.filePath = obj.filePath;
                    data.lineNr = data.line.lineNumber;
                    let isGroup = false;
                    utils_1.default.ast.walkChildren(obj.textEditor, data.line.lineNumber, () => {
                        isGroup = true;
                        return false;
                    });
                    const label = _.trimStart(data.line.text), item = isGroup ? new group_1.default(data, label) : new todo_1.default(data, label);
                    items.push(item);
                });
                if (!items.length)
                    return [new placeholder_1.default('The file is empty')];
                return items;
            }
            else {
                const keys = Object.keys(obj).sort();
                return keys.map(key => {
                    const val = obj[key];
                    if (this.directorySepRe.test(key)) {
                        const uri = utils_1.default.view.getURI(val);
                        return new file_1.default(val, uri);
                    }
                    else {
                        return new group_1.default(val, key, this.config.embedded.view.icons);
                    }
                });
            }
        });
    }
    refresh(clear) {
        this.clear = !!clear;
        super.refresh();
    }
}
/* EXPORT */
exports.default = new Files();
//# sourceMappingURL=file.js.map
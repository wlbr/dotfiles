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
const vscode = require("vscode");
const config_1 = require("../config");
/* VIEW */
class View {
    constructor() {
        this.onDidChangeTreeDataEvent = new vscode.EventEmitter();
        this.onDidChangeTreeData = this.onDidChangeTreeDataEvent.event;
        this.config = config_1.default.get();
    }
    getTreeItem(item) {
        return item;
    }
    getChildren(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    refresh() {
        this.config = config_1.default.get();
        this.onDidChangeTreeDataEvent.fire();
    }
}
/* EXPORT */
exports.default = View;
//# sourceMappingURL=view.js.map
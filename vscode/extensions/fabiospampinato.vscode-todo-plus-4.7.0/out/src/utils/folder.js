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
const absolute = require("absolute");
const findUp = require("find-up");
const path = require("path");
const vscode = require("vscode");
/* FOLDER */
const Folder = {
    getAllRootPaths() {
        const { workspaceFolders } = vscode.workspace;
        if (!workspaceFolders)
            return [];
        return workspaceFolders.map(folder => folder.uri.fsPath);
    },
    getRootPath(basePath) {
        const { workspaceFolders } = vscode.workspace;
        if (!workspaceFolders)
            return;
        const firstRootPath = workspaceFolders[0].uri.fsPath;
        if (!basePath || !absolute(basePath))
            return firstRootPath;
        const rootPaths = workspaceFolders.map(folder => folder.uri.fsPath), sortedRootPaths = _.sortBy(rootPaths, [path => path.length]).reverse(); // In order to get the closest root
        return sortedRootPaths.find(rootPath => basePath.startsWith(rootPath));
    },
    getWrapperPathOf(rootPath, cwdPath, findPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundPath = yield findUp(findPath, { cwd: cwdPath });
            if (foundPath) {
                const wrapperPath = path.dirname(foundPath);
                if (wrapperPath.startsWith(rootPath)) {
                    return wrapperPath;
                }
            }
        });
    },
    rootsRe: undefined,
    initRootsRe() {
        const roots = Folder.getAllRootPaths().sort().reverse(), rootsRe = new RegExp(`^(${roots.map(root => _.escapeRegExp(root).replace(/\\\\/g, '(?:\\\\|/)')).join('|')})(.*)$`);
        Folder.rootsRe = rootsRe;
    },
    parsePath(filePath) {
        if (!Folder.rootsRe)
            return {};
        const match = Folder.rootsRe.exec(filePath);
        if (!match)
            return {};
        return {
            root: path.basename(match[1]),
            rootPath: match[1],
            relativePath: match[2]
        };
    }
};
/* EXPORT */
exports.default = Folder;
//# sourceMappingURL=folder.js.map
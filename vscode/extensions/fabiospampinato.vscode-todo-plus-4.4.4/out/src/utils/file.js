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
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const pify = require("pify");
const vscode = require("vscode");
/* FILE */
const File = {
    open(filepath, isTextDocument = true, lineNumber, startIndex = 0, endIndex = startIndex) {
        filepath = path.normalize(filepath);
        const fileuri = vscode.Uri.file(filepath);
        if (isTextDocument) {
            return vscode.workspace.openTextDocument(fileuri)
                .then(doc => vscode.window.showTextDocument(doc, { preview: false }))
                .then(() => {
                if (_.isUndefined(lineNumber))
                    return;
                const textEditor = vscode.window.activeTextEditor;
                if (!textEditor)
                    return;
                const startPos = new vscode.Position(lineNumber, startIndex);
                const endPos = new vscode.Position(lineNumber, endIndex);
                const selection = new vscode.Selection(startPos, endPos);
                textEditor.selection = selection;
                textEditor.revealRange(selection, vscode.TextEditorRevealType.Default);
            });
        }
        else {
            return vscode.commands.executeCommand('vscode.open', fileuri);
        }
    },
    read(filepath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield pify(fs.readFile)(filepath, { encoding: 'utf8' })).toString();
            }
            catch (e) {
                return;
            }
        });
    },
    readSync(filepath) {
        try {
            return (fs.readFileSync(filepath, { encoding: 'utf8' })).toString();
        }
        catch (e) {
            return;
        }
    },
    make(filepath, content) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pify(mkdirp)(path.dirname(filepath));
            return File.write(filepath, content);
        });
    },
    write(filepath, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return pify(fs.writeFile)(filepath, content, {});
        });
    }
};
/* EXPORT */
exports.default = File;
//# sourceMappingURL=file.js.map
"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const diff = require("diff");
const vscode = require("vscode");
const consts_1 = require("../consts");
/* EDITOR */
const Editor = {
    isSupported(textEditor) {
        return textEditor && (textEditor.document.languageId === consts_1.default.languageId);
    },
    open(content) {
        vscode.workspace.openTextDocument({ language: consts_1.default.languageId }).then((textDocument) => {
            vscode.window.showTextDocument(textDocument, { preview: false }).then((textEditor) => {
                textEditor.edit(edit => {
                    const pos = new vscode.Position(0, 0);
                    edit.insert(pos, content);
                    textEditor.document.save();
                });
            });
        });
    },
    edits: {
        apply(textEditor, edits) {
            const uri = textEditor.document.uri, edit = new vscode.WorkspaceEdit();
            edit.set(uri, edits);
            return vscode.workspace.applyEdit(edit);
        },
        /* MAKE */
        makeDiff(before, after, lineNr = 0) {
            if (before === after)
                return;
            const changes = diff.diffWordsWithSpace(before, after);
            let index = 0;
            return _.filter(changes.map(change => {
                if (change.added) {
                    return Editor.edits.makeInsert(change.value, lineNr, index);
                }
                else if (change.removed) {
                    const edit = Editor.edits.makeDelete(lineNr, index, index + change.value.length);
                    index += change.value.length;
                    return edit;
                }
                else {
                    index += change.value.length;
                }
            }));
        },
        makeDelete(lineNr, fromCh, toCh = fromCh) {
            const range = new vscode.Range(lineNr, fromCh, lineNr, toCh), edit = vscode.TextEdit.delete(range);
            return edit;
        },
        makeDeleteLine(lineNr) {
            const range = new vscode.Range(lineNr, 0, lineNr + 1, 0), edit = vscode.TextEdit.delete(range);
            return edit;
        },
        makeInsert(insertion, lineNr, charNr) {
            const position = new vscode.Position(lineNr, charNr), edit = vscode.TextEdit.insert(position, insertion);
            return edit;
        },
        makeReplace(replacement, lineNr, fromCh, toCh = fromCh) {
            const range = new vscode.Range(lineNr, fromCh, lineNr, toCh), edit = vscode.TextEdit.replace(range, replacement);
            return edit;
        }
    }
};
/* EXPORT */
exports.default = Editor;
//# sourceMappingURL=editor.js.map
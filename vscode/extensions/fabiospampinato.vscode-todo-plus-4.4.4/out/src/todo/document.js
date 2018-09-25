"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const string_matches_1 = require("string-matches");
const vscode = require("vscode");
const consts_1 = require("../consts");
const utils_1 = require("../utils");
const items_1 = require("./items");
/* DOCUMENT */
class Document {
    constructor(res) {
        if (_.isString(res)) {
            this.text = res;
        }
        else {
            if ('document' in res) { // => vscode.TextEditor
                this.textEditor = res; //TSC
                this.textDocument = this.textEditor.document;
            }
            else { // => vscode.TextDocument
                this.textEditor = vscode.window.visibleTextEditors.find(te => te.document === res) || vscode.window.activeTextEditor;
                this.textDocument = res; //TSC
            }
        }
    }
    /* GET */
    getItems(Item, regex) {
        const matchText = _.isString(this.text) ? this.text : this.textDocument.getText(), matches = string_matches_1.default(matchText, regex);
        return matches.map(match => {
            return new Item(this.textEditor, undefined, match);
        });
    }
    getItemAt(Item, lineNumber, checkValidity = true) {
        const line = this.textDocument.lineAt(lineNumber);
        if (checkValidity && !Item.is(line.text))
            return;
        return new Item(this.textEditor, line);
    }
    getLines() {
        return _.range(this.textDocument.lineCount).map(lineNr => this.getLineAt(lineNr));
    }
    getLineAt(lineNr) {
        return this.getItemAt(items_1.Line, lineNr, false);
    }
    getArchive() {
        return this.getItems(items_1.Archive, consts_1.default.regexes.archive)[0];
    }
    getComments() {
        return this.getItems(items_1.Comment, consts_1.default.regexes.comment);
    }
    getCommentAt(lineNumber, checkValidity) {
        return this.getItemAt(items_1.Comment, lineNumber, checkValidity);
    }
    getFormatted() {
        return this.getItems(items_1.Formatted, consts_1.default.regexes.formatted);
    }
    getProjects() {
        return this.getItems(items_1.Project, consts_1.default.regexes.project);
    }
    getProjectAt(lineNumber, checkValidity) {
        return this.getItemAt(items_1.Project, lineNumber, checkValidity);
    }
    getTags() {
        return this.getItems(items_1.Tag, consts_1.default.regexes.tagSpecialNormal);
    }
    getTodos() {
        return this.getItems(items_1.Todo, consts_1.default.regexes.todo);
    }
    getTodoAt(lineNumber, checkValidity) {
        return this.getItemAt(items_1.Todo, lineNumber, checkValidity);
    }
    getTodosBox() {
        return this.getItems(items_1.TodoBox, consts_1.default.regexes.todoBox);
    }
    getTodoBoxAt(lineNumber, checkValidity) {
        return this.getItemAt(items_1.TodoBox, lineNumber, checkValidity);
    }
    getTodosBoxStarted() {
        return this.getItems(items_1.TodoBox, consts_1.default.regexes.todoBoxStarted);
    }
    getTodosDone() {
        return this.getItems(items_1.TodoDone, consts_1.default.regexes.todoDone);
    }
    getTodoDoneAt(lineNumber, checkValidity) {
        return this.getItemAt(items_1.TodoDone, lineNumber, checkValidity);
    }
    getTodosCancelled() {
        return this.getItems(items_1.TodoCancelled, consts_1.default.regexes.todoCancelled);
    }
    getTodoCancelledAt(lineNumber, checkValidity) {
        return this.getItemAt(items_1.TodoCancelled, lineNumber, checkValidity);
    }
    /* IS */
    isSupported() {
        return utils_1.default.editor.isSupported(this.textEditor);
    }
}
/* EXPORT */
exports.default = Document;
//# sourceMappingURL=document.js.map
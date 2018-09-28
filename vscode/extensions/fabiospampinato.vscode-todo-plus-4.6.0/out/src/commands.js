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
const path = require("path");
const vscode = require("vscode");
const config_1 = require("./config");
const consts_1 = require("./consts");
const document_1 = require("./todo/document");
const timer_1 = require("./statusbars/timer");
const utils_1 = require("./utils");
const embedded_1 = require("./views/embedded");
const files_1 = require("./views/files");
/* CALL TODOS METHOD */
const callTodosMethodOptions = {
    checkValidity: false,
    filter: _.identity,
    method: undefined,
    args: [],
    errors: {
        invalid: 'Only todos can perform this action',
        filtered: 'This todo cannot perform this action'
    }
};
function callTodosMethod(options) {
    return __awaiter(this, void 0, void 0, function* () {
        options = _.isString(options) ? { method: options } : options;
        options = _.merge({}, callTodosMethodOptions, options);
        const textEditor = vscode.window.activeTextEditor, doc = new document_1.default(textEditor);
        if (!doc.isSupported())
            return;
        const lines = _.uniq(textEditor.selections.map(selection => selection.active.line)), todos = _.filter(lines.map(line => doc.getTodoAt(line, options.checkValidity)));
        if (todos.length !== lines.length)
            vscode.window.showErrorMessage(options.errors.invalid);
        if (!todos.length)
            return;
        const todosFiltered = todos.filter(options.filter);
        if (todosFiltered.length !== todos.length)
            vscode.window.showErrorMessage(options.errors.filtered);
        if (!todosFiltered.length)
            return;
        todosFiltered.map(todo => todo[options.method](...options.args));
        const edits = _.filter(_.flattenDeep(todosFiltered.map(todo => todo['makeEdit']())));
        if (!edits.length)
            return;
        const selectionsTagIndexes = textEditor.selections.map(selection => {
            const line = textEditor.document.lineAt(selection.start.line);
            return line.text.indexOf(consts_1.default.symbols.tag);
        });
        yield utils_1.default.editor.edits.apply(textEditor, edits);
        textEditor.selections = textEditor.selections.map((selection, index) => {
            if (selectionsTagIndexes[index] >= 0)
                return selection;
            const line = textEditor.document.lineAt(selection.start.line);
            if (selection.start.character !== line.text.length)
                return selection;
            const tagIndex = line.text.indexOf(consts_1.default.symbols.tag);
            if (tagIndex < 0)
                return selection;
            const position = new vscode.Position(selection.start.line, tagIndex);
            return new vscode.Selection(position, position);
        });
    });
}
/* COMMANDS */
function open(filePath, lineNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        filePath = _.isString(filePath) ? filePath : undefined;
        lineNumber = _.isNumber(lineNumber) ? lineNumber : undefined;
        if (filePath) {
            return utils_1.default.file.open(filePath, true, lineNumber);
        }
        else {
            const config = config_1.default.get(), { activeTextEditor } = vscode.window, editorPath = activeTextEditor && activeTextEditor.document.uri.fsPath, rootPath = utils_1.default.folder.getRootPath(editorPath);
            if (!rootPath)
                return vscode.window.showErrorMessage('You have to open a project before being able to open its todo file');
            const projectPath = ((yield utils_1.default.folder.getWrapperPathOf(rootPath, editorPath || rootPath, config.file.name)) || rootPath), todo = utils_1.default.todo.get(projectPath);
            if (!_.isUndefined(todo)) { // Open
                return utils_1.default.file.open(todo.path, true, lineNumber);
            }
            else { // Create
                const defaultPath = path.join(projectPath, config.file.name);
                yield utils_1.default.file.make(defaultPath, config.file.defaultContent);
                return utils_1.default.file.open(defaultPath);
            }
        }
    });
}
exports.open = open;
function openEmbedded() {
    return __awaiter(this, void 0, void 0, function* () {
        const config = config_1.default.get(), todos = yield utils_1.default.embedded.get(undefined, config.embedded.file.groupByRoot, config.embedded.file.groupByType, config.embedded.file.groupByFile), content = utils_1.default.embedded.renderTodos(todos);
        if (!content)
            return vscode.window.showInformationMessage('No embedded todos found');
        utils_1.default.editor.open(content);
    });
}
exports.openEmbedded = openEmbedded;
function toggleBox() {
    return callTodosMethod('toggleBox');
}
exports.toggleBox = toggleBox;
exports.editorToggleBox = toggleBox;
function toggleDone() {
    return callTodosMethod('toggleDone');
}
exports.toggleDone = toggleDone;
exports.editorToggleDone = toggleDone;
function toggleCancelled() {
    return callTodosMethod('toggleCancelled');
}
exports.toggleCancelled = toggleCancelled;
exports.editorToggleCancelled = toggleCancelled;
function toggleStart() {
    return callTodosMethod({
        checkValidity: true,
        filter: todo => todo.isBox(),
        method: 'toggleStart',
        errors: {
            invalid: 'Only todos can be started',
            filtered: 'Only not done/cancelled todos can be started'
        }
    });
}
exports.toggleStart = toggleStart;
exports.editorToggleStart = toggleStart;
function toggleTimer() {
    consts_1.default.timer = !consts_1.default.timer;
    timer_1.default.updateVisibility();
    timer_1.default.updateTimer();
    vscode.window.showInformationMessage(`Timer ${consts_1.default.timer ? 'enabled' : 'disabled'}`);
}
exports.toggleTimer = toggleTimer;
function archive() {
    const textEditor = vscode.window.activeTextEditor, doc = new document_1.default(textEditor);
    if (!doc.isSupported())
        return;
    utils_1.default.archive.run(doc);
}
exports.archive = archive;
exports.editorArchive = archive;
/* VIEW */
function viewOpenFile(file) {
    utils_1.default.file.open(file.resourceUri.fsPath, true, 0);
}
exports.viewOpenFile = viewOpenFile;
function viewRevealTodo(todo) {
    if (todo.obj.todo) {
        const startIndex = todo.obj.rawLine.indexOf(todo.obj.todo), endIndex = startIndex + todo.obj.todo.length;
        utils_1.default.file.open(todo.obj.filePath, true, todo.obj.lineNr, startIndex, endIndex);
    }
    else {
        utils_1.default.file.open(todo.obj.filePath, true, todo.obj.lineNr);
    }
}
exports.viewRevealTodo = viewRevealTodo;
/* VIEW FILE */
function viewFilesOpen() {
    open();
}
exports.viewFilesOpen = viewFilesOpen;
function viewFilesRefresh() {
    files_1.default.refresh();
}
exports.viewFilesRefresh = viewFilesRefresh;
function viewFilesCollapse() {
    files_1.default.expanded = false;
    vscode.commands.executeCommand('setContext', 'todo-files-expanded', false);
    files_1.default.refresh(true);
}
exports.viewFilesCollapse = viewFilesCollapse;
function viewFilesExpand() {
    files_1.default.expanded = true;
    vscode.commands.executeCommand('setContext', 'todo-files-expanded', true);
    files_1.default.refresh(true);
}
exports.viewFilesExpand = viewFilesExpand;
/* VIEW EMBEDDED */
function viewEmbeddedRefresh() {
    embedded_1.default.refresh();
}
exports.viewEmbeddedRefresh = viewEmbeddedRefresh;
function viewEmbeddedCollapse() {
    embedded_1.default.expanded = false;
    vscode.commands.executeCommand('setContext', 'todo-embedded-expanded', false);
    embedded_1.default.refresh(true);
}
exports.viewEmbeddedCollapse = viewEmbeddedCollapse;
function viewEmbeddedExpand() {
    embedded_1.default.expanded = true;
    vscode.commands.executeCommand('setContext', 'todo-embedded-expanded', true);
    embedded_1.default.refresh(true);
}
exports.viewEmbeddedExpand = viewEmbeddedExpand;
function viewEmbeddedFilter() {
    return __awaiter(this, void 0, void 0, function* () {
        const filter = yield vscode.window.showInputBox({ placeHolder: 'Filter string...' });
        if (!filter || embedded_1.default.filter === filter)
            return;
        embedded_1.default.filter = filter;
        vscode.commands.executeCommand('setContext', 'todo-embedded-filtered', true);
        embedded_1.default.refresh();
    });
}
exports.viewEmbeddedFilter = viewEmbeddedFilter;
function viewEmbeddedClearFilter() {
    embedded_1.default.filter = false;
    vscode.commands.executeCommand('setContext', 'todo-embedded-filtered', false);
    embedded_1.default.refresh();
}
exports.viewEmbeddedClearFilter = viewEmbeddedClearFilter;
//# sourceMappingURL=commands.js.map
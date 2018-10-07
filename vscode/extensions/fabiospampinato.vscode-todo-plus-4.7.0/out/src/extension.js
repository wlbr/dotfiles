"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const config_1 = require("./config");
const consts_1 = require("./consts");
const completion_1 = require("./providers/completion");
const symbols_1 = require("./providers/symbols");
const document_1 = require("./todo/decorators/document");
const changes_1 = require("./todo/decorators/changes");
const utils_1 = require("./utils");
const embedded_1 = require("./views/embedded");
const files_1 = require("./views/files");
/* ACTIVATE */
const activate = function (context) {
    const config = config_1.default.get();
    config_1.default.check(config);
    embedded_1.default.expanded = config.embedded.view.expanded;
    vscode.commands.executeCommand('setContext', 'todo-embedded-expanded', embedded_1.default.expanded);
    vscode.commands.executeCommand('setContext', 'todo-embedded-filtered', !!embedded_1.default.filter);
    files_1.default.expanded = config.file.view.expanded;
    vscode.commands.executeCommand('setContext', 'todo-files-expanded', files_1.default.expanded);
    vscode.commands.executeCommand('setContext', 'todo-files-open-button', true);
    utils_1.default.context = context;
    utils_1.default.folder.initRootsRe();
    utils_1.default.init.language();
    utils_1.default.init.views();
    utils_1.default.statistics.tokens.updateDisabledAll();
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(consts_1.default.languageId, new completion_1.default(), ...completion_1.default.triggerCharacters), vscode.languages.registerDocumentSymbolProvider(consts_1.default.languageId, new symbols_1.default()), vscode.window.onDidChangeActiveTextEditor(() => document_1.default.update()), vscode.workspace.onDidChangeConfiguration(consts_1.default.update), vscode.workspace.onDidChangeConfiguration(() => delete utils_1.default.embedded.filesData && delete utils_1.default.files.filesData), vscode.workspace.onDidChangeConfiguration(() => document_1.default.update()), vscode.workspace.onDidChangeConfiguration(utils_1.default.statistics.tokens.updateDisabledAll), vscode.workspace.onDidChangeTextDocument(changes_1.default.onChanges), vscode.workspace.onDidChangeWorkspaceFolders(utils_1.default.embedded.unwatchPaths), vscode.workspace.onDidChangeWorkspaceFolders(utils_1.default.files.unwatchPaths), vscode.workspace.onDidChangeWorkspaceFolders(utils_1.default.folder.initRootsRe));
    document_1.default.update();
    return utils_1.default.init.commands(context);
};
exports.activate = activate;
//# sourceMappingURL=extension.js.map
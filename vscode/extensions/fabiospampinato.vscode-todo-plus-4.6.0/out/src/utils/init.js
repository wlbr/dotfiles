"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const vscode = require("vscode");
const consts_1 = require("../consts");
const Commands = require("../commands");
const views_1 = require("../views");
/* INIT */
const Init = {
    commands(context) {
        const { commands } = vscode.extensions.getExtension('fabiospampinato.vscode-todo-plus').packageJSON.contributes;
        commands.forEach(({ command, title }) => {
            const commandName = _.last(command.split('.')), handler = Commands[commandName], disposable = vscode.commands.registerCommand(command, handler);
            context.subscriptions.push(disposable);
        });
        return Commands;
    },
    language() {
        vscode.languages.setLanguageConfiguration(consts_1.default.languageId, {
            wordPattern: /(-?\d*\.\d\w*)|([^\-\`\~\!\#\%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
            indentationRules: {
                increaseIndentPattern: consts_1.default.regexes.project,
                decreaseIndentPattern: consts_1.default.regexes.impossible
            }
        });
    },
    views() {
        views_1.default.forEach(View => {
            vscode.window.registerTreeDataProvider(View.id, View);
        });
        vscode.workspace.onDidChangeConfiguration(() => {
            views_1.default.forEach(View => View.refresh());
        });
    }
};
/* EXPORT */
exports.default = Init;
//# sourceMappingURL=init.js.map
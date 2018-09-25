'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const shFormat_1 = require("./shFormat");
const shfmtFormat_1 = require("./shfmtFormat");
function activate(context) {
    // console.log('Congratulations, your extension "shell-format" is now active!');
    let settings = vscode.workspace.getConfiguration('shellformat');
    let shfmter = new shFormat_1.Formatter();
    let symcShfmtFormater = new shfmtFormat_1.ShfmtFormatter(settings);
    let shFmtProvider = new shFormat_1.ShellDocumentFormattingEditProvider(shfmter, settings);
    symcShfmtFormater.checkEnv();
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider({ language: 'shellscript', scheme: 'file', }, shFmtProvider));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand('shell.format.shfmt', (textEditer, edit) => {
        let { document } = textEditer;
        let start;
        let end;
        start = new vscode.Position(0, 0);
        end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
        // edit.replace(new vscode.Range(start, end), symcShfmtFormater.formatDocument(document));
        let range = new vscode.Range(start, end);
        let content = document.getText(range);
        let formatedContent = symcShfmtFormater.formatCurrentDocumentWithContent(content);
        if (formatedContent != null) {
            edit.replace(range, formatedContent);
        }
    }));
    if ('runOnSave' in settings && settings['runOnSave']) {
        vscode.workspace.onWillSaveTextDocument((event) => {
            // Only on explicit save
            if (event.reason === 1) {
                vscode.commands.executeCommand('shell.format.shfmt');
            }
        });
    }
}
exports.activate = activate;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
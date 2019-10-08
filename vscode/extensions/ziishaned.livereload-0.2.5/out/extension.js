'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const LiveReload_1 = require("./LiveReload");
const vscode_1 = require("vscode");
function activate(context) {
    const livereload = new LiveReload_1.default();
    context.subscriptions.push(vscode_1.commands
        .registerCommand('extension.livereload', () => {
        livereload.createServer();
    }));
    context.subscriptions.push(livereload);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class StatusBarUi {
    static get statusbar() {
        if (!StatusBarUi._statusBarItem) {
            StatusBarUi._statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
            StatusBarUi._statusBarItem.command = null;
            this.statusbar.show();
        }
        return StatusBarUi._statusBarItem;
    }
    static listening() {
        StatusBarUi.statusbar.text = 'The LiveReload plugin has been enabled.';
        StatusBarUi.clear();
    }
    static stopListening() {
        StatusBarUi.statusbar.text = 'The LiveReload plugin has been disabled.';
        StatusBarUi.clear();
    }
    static connected() {
        StatusBarUi.statusbar.text = 'LiveReload client connected.';
        StatusBarUi.clear();
    }
    static disconnected() {
        StatusBarUi.statusbar.text = 'LiveReload client disconnected.';
        StatusBarUi.clear();
    }
    static refresh() {
        StatusBarUi.statusbar.text = 'LiveReload refresh from VS Code LiveReload.';
        StatusBarUi.clear();
    }
    static clear() {
        setTimeout(() => {
            StatusBarUi.statusbar.text = '';
        }, 1800);
    }
    dispose() {
        StatusBarUi.statusbar.dispose();
    }
}
exports.StatusBarUi = StatusBarUi;
//# sourceMappingURL=StatusBarUi.js.map
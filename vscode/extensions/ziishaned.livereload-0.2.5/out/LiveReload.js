"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const Server_1 = require("./Server");
const path_1 = require("path");
const StatusBarUi_1 = require("./StatusBarUi");
const vscode_1 = require("vscode");
class LiveReload {
    constructor() {
        this.config = config_1.default();
        this.isServerRunning = false;
        this.createServer = this.createServer.bind(this);
    }
    createServer() {
        if (this.isServerRunning) {
            this.server.stop();
            this.isServerRunning = false;
            return;
        }
        else {
            this.server = new Server_1.default(this.config);
            let path = this.getCurrentWorkSpace();
            this.server.watch(path);
            this.isServerRunning = true;
        }
        this.server.on('start', () => {
            StatusBarUi_1.StatusBarUi.listening();
        });
        this.server.on('stop', () => {
            StatusBarUi_1.StatusBarUi.stopListening();
        });
        this.server.on('refresh', () => {
            StatusBarUi_1.StatusBarUi.refresh();
        });
        this.server.on('connected', () => {
            StatusBarUi_1.StatusBarUi.connected();
        });
        this.server.on('disconnected', () => {
            StatusBarUi_1.StatusBarUi.disconnected();
        });
        this.server.start();
    }
    getCurrentWorkSpace() {
        let path = vscode_1.workspace.rootPath.split(/\s*,\s*/).map(function (x) {
            return path_1.resolve(x);
        });
        return path;
    }
    dispose() {
    }
}
exports.default = LiveReload;
//# sourceMappingURL=LiveReload.js.map
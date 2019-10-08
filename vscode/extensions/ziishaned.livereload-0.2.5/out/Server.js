"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws = require("ws");
const fs = require("fs");
const url = require("url");
const http = require("http");
const path = require("path");
const https = require("https");
const chokidar = require("chokidar");
const events_1 = require("events");
const PROTOCOL_SAVING_1 = 'http://livereload.com/protocols/saving-1';
const PROTOCOL_MONITORING_7 = 'http://livereload.com/protocols/official-7';
const PROTOCOL_CONN_CHECK_1 = 'http://livereload.com/protocols/connection-check-1';
class Server extends events_1.EventEmitter {
    constructor(config) {
        super();
        this.config = config;
        this.debug = this.debug.bind(this);
        this.watch = this.watch.bind(this);
        this.onClose = this.onClose.bind(this);
        this.refresh = this.refresh.bind(this);
        this.onConnection = this.onConnection.bind(this);
        this.filterRefresh = this.filterRefresh.bind(this);
        this.sendAllClients = this.sendAllClients.bind(this);
        if (this.config.https === null) {
            this.server = http.createServer(this.requestHandler);
        }
        else {
            this.server = https.createServer(config.https, this.requestHandler);
        }
    }
    requestHandler(req, res) {
        let content;
        switch (url.parse(req.url).pathname) {
            case '/':
                res.writeHead(200, { 'Content-Type': 'application/json' });
                break;
            case '/livereload.js':
            case '/xlivereload.js':
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                content = fs.readFileSync(__dirname + '/../ext/livereload.js');
                break;
            default:
                res.writeHead(300, { 'Content-Type': 'text/plain' });
                content = 'Not Found';
        }
        res.end(content);
    }
    start() {
        this.debug('LiveReload is waiting for browser to connect.');
        this.server.listen(this.config.port);
        this.emit('start');
        this.wsServer = new ws.Server({
            server: this.server
        });
        this.wsServer.on('connection', this.onConnection);
        this.wsServer.on('close', this.onClose);
    }
    stop() {
        if (this.server) {
            this.server.close();
            this.server = null;
        }
        this.unwatch();
        this.emit('stop');
    }
    onConnection(socket) {
        this.debug('Browser connected.');
        this.emit('connected');
        socket.on('message', (message) => {
            this.debug(`Message: ${message}`);
            let request = JSON.parse(message);
            if (request.command === 'hello') {
                this.debug("Client requested handshake...");
                let data = JSON.stringify({
                    command: 'hello',
                    protocols: [PROTOCOL_MONITORING_7],
                    serverName: 'vscode-livereload'
                });
                return socket.send(data);
            }
        });
        socket.on('error', (err) => {
            return console.error(`Error in client socket: ${err}`);
        });
        socket.on('close', (message) => {
            this.emit('disconnected');
            return this.debug('Client closed connection');
        });
    }
    onClose(socket) {
        return this.debug('Socket closed.');
    }
    watch(path) {
        this.debug(`Watching ${path}...`);
        this.path = path;
        this.watcher = chokidar.watch(path, {
            ignoreInitial: true,
            ignored: this.config.exclusions
        });
        this.watcher
            .on('add', this.filterRefresh)
            .on('change', this.filterRefresh)
            .on('unlink', this.filterRefresh);
    }
    unwatch() {
        if (this.watcher) {
            this.watcher.unwatch(this.path);
            this.watcher.close();
        }
        this.watcher = null;
        this.path = [];
    }
    filterRefresh(filepath) {
        const exts = this.config.exts;
        let fileext = path.extname(filepath).substring(1);
        if (exts.indexOf(fileext) !== -1) {
            if (this.config.delay) {
                setTimeout(function () {
                    return this.refresh(filepath);
                }, this.config.delay);
            }
            else {
                return this.refresh(filepath);
            }
        }
    }
    refresh(filepath) {
        this.debug(`Reloading: ${filepath}`);
        let data = JSON.stringify({
            command: 'reload',
            path: filepath,
            liveCSS: this.config.applyCSSLive,
            liveImg: this.config.applyImgLive
        });
        this.emit('refresh');
        setTimeout(() => {
            return this.sendAllClients(data);
        }, this.config.delayForUpdate);
    }
    sendAllClients(data) {
        let ref = this.wsServer.clients;
        let results = [];
        for (let i = 0, len = ref.length; i < len; i++) {
            let socket = ref[i];
            results.push(socket.send(data, (() => {
                return (error) => {
                    if (error) {
                        return console.error(error);
                    }
                };
            })));
        }
        return results;
    }
    debug(text) {
        if (this.config.debug) {
            console.log(text);
        }
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map
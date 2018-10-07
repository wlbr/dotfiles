"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const execa = require("execa");
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const config_1 = require("../../config");
const ag_1 = require("./providers/ag");
const js_1 = require("./providers/js");
const rg_1 = require("./providers/rg");
/* PROVIDERS */
const Providers = {
    javascript() {
        return js_1.default;
    },
    ag() {
        try {
            execa.sync('ag', ['--version']);
            return ag_1.default;
        }
        catch (e) { }
    },
    rg() {
        const config = config_1.default.get(), lookaroundRe = /\(\?<?(!|=)/;
        if (lookaroundRe.test(config.embedded.providers.rg.regex)) {
            vscode.window.showErrorMessage('ripgrep doesn\'t support lookaheads and lookbehinds, you have to update your "todo.embedded.providers.rg.regex" setting if you want to use ripgrep');
            return;
        }
        try {
            execa.sync('rg', ['--version']);
            return rg_1.default;
        }
        catch (e) { }
        const name = /^win/.test(process.platform) ? 'rg.exe' : 'rg', basePath = path.dirname(path.dirname(require.main.filename)), filePaths = [
            path.join(basePath, `node_modules.asar.unpacked/vscode-ripgrep/bin/${name}`),
            path.join(basePath, `node_modules/vscode-ripgrep/bin/${name}`)
        ];
        for (let filePath of filePaths) {
            try {
                fs.accessSync(filePath);
                rg_1.default.bin = filePath;
                return rg_1.default;
            }
            catch (e) { }
        }
    }
};
/* PROVIDER */
const provider = config_1.default.get().embedded.provider, Provider = provider ? Providers[provider]() || Providers.javascript() : Providers.ag() || Providers.rg() || Providers.javascript();
/* EXPORT */
exports.default = new Provider();
//# sourceMappingURL=index.js.map
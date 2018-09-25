"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const execa = require("execa");
const config_1 = require("../../../config");
const ag_1 = require("./ag");
/* RG */ // ripgrep //URL: https://github.com/BurntSushi/ripgrep
class RG extends ag_1.default {
    execa(filePaths) {
        const config = config_1.default.get();
        return execa(RG.bin, ['--color', 'never', '--with-filename', '--pretty', ...config.embedded.providers.rg.args, config.embedded.providers.rg.regex, ...filePaths]);
    }
}
RG.bin = 'rg';
/* EXPORT */
exports.default = RG;
//# sourceMappingURL=rg.js.map
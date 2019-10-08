"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const vscode_1 = require("vscode");
const DEFAULT_EXTS = 'html htm css js png gif jpg php php5 py rb erb coffee twig'.split(' ');
const DEFAULT_EXCLUSIONS = '.DS_Store .gitignore .git .svn .hg'.split(' ');
function default_1() {
    let config = {
        debug: vscode_1.workspace.getConfiguration().get('livereload.debug') || false,
        port: vscode_1.workspace.getConfiguration().get('livereload.port') || 35729,
        https: vscode_1.workspace.getConfiguration().get('livereload.useHTTPS') ? {} : null,
        applyCSSLive: vscode_1.workspace.getConfiguration().get('livereload.applyCSSLive') || true,
        applyImageLive: vscode_1.workspace.getConfiguration().get('livereload.applyImageLive') || true,
        delayForUpdate: vscode_1.workspace.getConfiguration().get('livereload.delayForUpdate') || 0,
        exts: vscode_1.workspace.getConfiguration().get('livereload.exts') ? _.split(vscode_1.workspace.getConfiguration().get('livereload.exts'), ',') : '',
        exclusions: vscode_1.workspace.getConfiguration().get('livereload.exclusions') ? _.split(vscode_1.workspace.getConfiguration().get('livereload.exclusions'), ',') : ''
    };
    config.exts = _.chain(config.exts).map(ext => ext.trim()).concat(DEFAULT_EXTS).uniq().value();
    config.exclusions = _.chain(config.exclusions).map(ex => ex.trim()).concat(DEFAULT_EXCLUSIONS).uniq().value();
    return config;
}
exports.default = default_1;
//# sourceMappingURL=config.js.map
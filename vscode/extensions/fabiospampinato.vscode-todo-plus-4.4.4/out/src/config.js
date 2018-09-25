"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const vscode = require("vscode");
/* CONFIG */
const Config = {
    get(extension = 'todo') {
        return vscode.workspace.getConfiguration().get(extension);
    },
    getKey(key) {
        return _.get(Config.get(), key);
    },
    check(config) {
        const checkers = [
            config => _.isString(_.get(config, 'file')) && 'Todo+: "todo.file" has been renamed to "todo.file.name"',
            config => _.isString(_.get(config, 'defaultContent')) && 'Todo+: "todo.defaultContent" has been renamed to "todo.file.defaultContent"'
        ];
        const errors = _.compact(checkers.map(checker => checker(config)));
        if (!errors.length)
            return;
        errors.forEach(err => vscode.window.showErrorMessage(err));
        throw new Error('Invalid configuration, check the changelog');
    }
};
/* EXPORT */
exports.default = Config;
//# sourceMappingURL=config.js.map
"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const path = require("path");
const vscode = require("vscode");
const config_1 = require("../config");
const file_1 = require("./file");
/* TODO */
const Todo = {
    getFiles(folderPath) {
        const config = config_1.default.get(), { extensions } = vscode.extensions.getExtension('fabiospampinato.vscode-todo-plus').packageJSON.contributes.languages[0], files = _.uniq([config.file.name, ...extensions]);
        return files.map(file => path.join(folderPath, file));
    },
    get(folderPath) {
        const files = Todo.getFiles(folderPath);
        for (let file of files) {
            const content = file_1.default.readSync(file);
            if (_.isUndefined(content))
                continue;
            return {
                path: file,
                content
            };
        }
    }
};
/* EXPORT */
exports.default = Todo;
//# sourceMappingURL=todo.js.map
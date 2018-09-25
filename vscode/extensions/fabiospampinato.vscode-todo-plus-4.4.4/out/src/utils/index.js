"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const ackmate_1 = require("./ackmate");
const archive_1 = require("./archive");
const ast_1 = require("./ast");
const command_1 = require("./command");
const editor_1 = require("./editor");
const embedded_1 = require("./embedded");
const file_1 = require("./file");
const files_1 = require("./files");
const folder_1 = require("./folder");
const init_1 = require("./init");
const regex_1 = require("./regex");
const time_1 = require("./time");
const todo_1 = require("./todo");
const statistics_1 = require("./statistics");
const view_1 = require("./view");
/* UTILS */
const Utils = {
    context: undefined,
    ackmate: ackmate_1.default,
    archive: archive_1.default,
    ast: ast_1.default,
    command: command_1.default,
    editor: editor_1.default,
    embedded: embedded_1.default,
    file: file_1.default,
    files: files_1.default,
    folder: folder_1.default,
    init: init_1.default,
    regex: regex_1.default,
    time: time_1.default,
    todo: todo_1.default,
    statistics: statistics_1.default,
    view: view_1.default
};
/* EXPORT */
exports.default = Utils;
//# sourceMappingURL=index.js.map
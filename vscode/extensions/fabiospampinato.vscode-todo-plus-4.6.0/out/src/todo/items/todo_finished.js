"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../../consts");
const item_1 = require("./item");
const todo_1 = require("./todo");
/* TODO FINISHED */
class TodoFinished extends todo_1.default {
    static is(str) {
        return item_1.default.is(str, consts_1.default.regexes.todoFinished);
    }
}
/* EXPORT */
exports.default = TodoFinished;
//# sourceMappingURL=todo_finished.js.map
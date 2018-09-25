"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../../consts");
const item_1 = require("./item");
const todo_1 = require("./todo");
/* TODO CANCELLED */
class TodoCancelled extends todo_1.default {
    static is(str) {
        return item_1.default.is(str, consts_1.default.regexes.todoCancelled);
    }
}
/* EXPORT */
exports.default = TodoCancelled;
//# sourceMappingURL=todo_cancelled.js.map
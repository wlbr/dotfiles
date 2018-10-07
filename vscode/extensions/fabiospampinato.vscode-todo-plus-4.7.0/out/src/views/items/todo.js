"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const item_1 = require("./item");
/* TODO */
class Todo extends item_1.default {
    constructor(obj, label, icon = false) {
        super(obj, label);
        this.contextValue = 'todo';
        this.tooltip = obj.code || obj.line;
        this.command = {
            title: 'Reveal',
            command: 'todo.viewRevealTodo',
            arguments: [this]
        };
        if (icon) {
            this.setTypeIcon(obj.type);
        }
    }
}
/* EXPORT */
exports.default = Todo;
//# sourceMappingURL=todo.js.map
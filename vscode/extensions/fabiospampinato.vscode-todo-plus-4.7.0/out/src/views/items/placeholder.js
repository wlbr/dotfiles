"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const item_1 = require("./item");
/* PLACEHOLDER */
class Placeholder extends item_1.default {
    constructor(label) {
        super(undefined, label);
        this.contextValue = 'placeholder';
    }
}
/* EXPORT */
exports.default = Placeholder;
//# sourceMappingURL=placeholder.js.map
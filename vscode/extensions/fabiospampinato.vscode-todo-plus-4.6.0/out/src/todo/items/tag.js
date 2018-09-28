"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../../consts");
const item_1 = require("./item");
/* TAG */
class Tag extends item_1.default {
    isNormal() {
        return !this.isSpecial();
    }
    isSpecial() {
        return item_1.default.is(this.text, consts_1.default.regexes.tagSpecial);
    }
    static is(str) {
        return super.is(str, consts_1.default.regexes.tag);
    }
}
/* EXPORT */
exports.default = Tag;
//# sourceMappingURL=tag.js.map
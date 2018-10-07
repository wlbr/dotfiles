"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../../consts");
const item_1 = require("./item");
/* COMMENT */
class Comment extends item_1.default {
    static is(str) {
        return super.is(str, consts_1.default.regexes.comment);
    }
}
/* EXPORT */
exports.default = Comment;
//# sourceMappingURL=comment.js.map
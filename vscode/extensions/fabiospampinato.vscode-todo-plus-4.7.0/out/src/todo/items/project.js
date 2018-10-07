"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../../consts");
const item_1 = require("./item");
/* PROJECT */
class Project extends item_1.default {
    static is(str) {
        return super.is(str, consts_1.default.regexes.project);
    }
}
/* EXPORT */
exports.default = Project;
//# sourceMappingURL=project.js.map
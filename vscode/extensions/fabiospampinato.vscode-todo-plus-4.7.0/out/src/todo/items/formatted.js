"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../../consts");
const item_1 = require("./item");
/* FORMATTED */
class Formatted extends item_1.default {
    isCode() {
        return item_1.default.is(this.text, consts_1.default.regexes.formattedCode);
    }
    isBold() {
        return item_1.default.is(this.text, consts_1.default.regexes.formattedBold);
    }
    isItalic() {
        return item_1.default.is(this.text, consts_1.default.regexes.formattedItalic);
    }
    isStrikethrough() {
        return item_1.default.is(this.text, consts_1.default.regexes.formattedStrikethrough);
    }
    static is(str) {
        return super.is(str, consts_1.default.regexes.formatted);
    }
}
/* EXPORT */
exports.default = Formatted;
//# sourceMappingURL=formatted.js.map
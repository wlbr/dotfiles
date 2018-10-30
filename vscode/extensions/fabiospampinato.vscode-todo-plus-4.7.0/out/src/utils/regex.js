"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
/* REGEX */
const Regex = {
    test(re, str) {
        re.lastIndex = 0; // Ensuring it works also for regexes with the `g` flag
        return re.test(str);
    },
    /* MATCHES */
    matches2ranges(matches) {
        return matches.map(Regex.match2range);
    },
    match2range(match) {
        const first = match[0], last = _.findLast(match, txt => txt && txt.length), //TSC
        start = match.index + first.indexOf(last), end = start + last.length;
        return { start, end };
    },
};
/* EXPORT */
exports.default = Regex;
//# sourceMappingURL=regex.js.map
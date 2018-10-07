"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const string_matches_1 = require("string-matches");
const vscode = require("vscode");
const utils_1 = require("../../utils");
/* LINE */
class Line {
    constructor() {
        this.TYPES = [];
    }
    /* RANGE */
    parseRanges(text, rangesRaw) {
        let negRanges = _.flatten(_.castArray(rangesRaw)); //TSC
        return _.filter(_.flatten(negRanges.map(neg => {
            if (!neg)
                return;
            if (neg instanceof vscode.Range) {
                return {
                    start: neg.start.character,
                    startLine: neg.start.line,
                    end: neg.end.character,
                    endLine: neg.end.line
                };
            }
            else if (neg instanceof RegExp) {
                const matches = string_matches_1.default(text, neg), ranges = utils_1.default.regex.matches2ranges(matches);
                return ranges;
            }
        })));
    }
    getRangeDifference(text, posRange, negRangesRaw = []) {
        const posOffset = posRange.start.character;
        /* NEGATIVE RANGES */
        const negRanges = this.parseRanges(text, negRangesRaw).filter(range => range && range.start < range.end && (!range['line'] || range['line'] === posRange.start.line)); //TSC
        /* DIFFERENCE */
        if (!negRanges.length)
            return posRange;
        // Algorithm:
        // 1. All cells start unfilled
        // 2. Filling all the positive cells
        // 3. Unfilling all the negative cells
        // 4. Transforming consecutive positive cells to ranges
        const cells = Array(posOffset + text.length); // 1.
        _.fill(cells, true, posRange.start.character, posRange.end.character); // 2.
        negRanges.forEach(({ start, end }) => _.fill(cells, false, posOffset + start, posOffset + end)); // 3.
        const ranges = [];
        let start = null, end = null;
        for (let i = 0, l = cells.length; i < l; i++) { // 4.
            const cell = cells[i];
            if (start === null) {
                if (cell)
                    start = i;
            }
            else {
                if (!cell)
                    end = i;
            }
            if (start !== null && (end !== null || i === l - 1)) { //FIXME: What if there's only 1 character?
                end = end !== null ? end : l;
                ranges.push(new vscode.Range(posRange.start.line, start, posRange.start.line, end));
                start = null;
                end = null;
            }
        }
        return ranges;
    }
    /* ITEMS */
    getItemRanges(item, negRanges) {
        return _.isEmpty(negRanges) ? [item.range] : [this.getRangeDifference(item.text, item.range, negRanges)];
    }
    getItemsRanges(items, negRanges) {
        const ranges = items.map(item => this.getItemRanges(item, negRanges)), zipped = _.zip(...ranges), compact = zipped.map(_.compact), concat = compact.map(r => _.concat([], ...r));
        return concat;
    }
    getDecorations(items, negRanges) {
        let ranges = this.getItemsRanges(items, negRanges);
        return this.TYPES.map((type, index) => ({
            type,
            ranges: ranges[index] || []
        }));
    }
}
/* EXPORT */
exports.default = Line;
//# sourceMappingURL=line.js.map
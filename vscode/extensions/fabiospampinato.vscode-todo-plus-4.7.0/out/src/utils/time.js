"use strict";
//TODO: Publish as `time-diff` or something
Object.defineProperty(exports, "__esModule", { value: true });
/* IMPORT */
const _ = require("lodash");
const moment = require("moment");
require("moment-precise-range-plugin");
const toTime = require("to-time");
const sugar = require('sugar-date'); //TSC
/* TIME */
const Time = {
    diff(to, from = new Date(), format = 'long') {
        const toSeconds = Time.diffSeconds(to, from), toDate = new Date(from.getTime() + (toSeconds * 1000));
        switch (format) {
            case 'long': return Time.diffLong(toDate, from);
            case 'short': return Time.diffShort(toDate, from);
            case 'short-compact': return Time.diffShortCompact(toDate, from);
            case 'clock': return Time.diffClock(toDate, from);
            case 'seconds': return Time.diffSeconds(toDate, from);
        }
    },
    diffLong(to, from = new Date()) {
        return moment['preciseDiff'](from, to);
    },
    diffShortRaw(to, from = new Date()) {
        const seconds = Math.round((to.getTime() - from.getTime()) / 1000), secondsAbs = Math.abs(seconds), sign = Math.sign(seconds);
        let remaining = secondsAbs, parts = [];
        const sections = [
            ['y', 31536000],
            ['w', 604800],
            ['d', 86400],
            ['h', 3600],
            ['m', 60],
            ['s', 1]
        ];
        sections.forEach(([token, seconds]) => {
            const times = Math.floor(remaining / seconds);
            parts.push({ times, token });
            remaining -= seconds * times;
        });
        return { parts, sign };
    },
    diffShort(to, from) {
        const { parts, sign } = Time.diffShortRaw(to, from);
        const shortParts = [];
        parts.forEach(({ times, token }) => {
            if (!times)
                return;
            shortParts.push(`${times}${token}`);
        });
        return `${sign < 0 ? '-' : ''}${shortParts.join(' ')}`;
    },
    diffShortCompact(to, from) {
        return Time.diffShort(to, from).replace(/\s+/g, '');
    },
    diffClock(to, from) {
        const { parts, sign } = Time.diffShortRaw(to, from);
        const padTokens = ['h', 'm', 's'], clockParts = [];
        parts.forEach(({ times, token }) => {
            if (!times && !clockParts.length)
                return;
            clockParts.push(`${padTokens.indexOf(token) >= 0 && clockParts.length ? _.padStart(times, 2, '0') : times}`);
        });
        return `${sign < 0 ? '-' : ''}${clockParts.join(':')}`;
    },
    diffSeconds(to, from = new Date()) {
        let toDate;
        if (to instanceof Date) {
            toDate = to;
        }
        else if (_.isNumber(to)) {
            toDate = new Date(to);
        }
        else {
            to = to.replace(/ and /gi, ' ');
            to = to.replace(/(\d)(ms|s|m|h|d|w|y)(\d)/gi, '$1$2 $3');
            if (/^\s*\d+\s*$/.test(to))
                return 0;
            if (!toDate) { // sugar + ` from now` //FIXME: Should be + ` from ${date.toString ()}` or something
                const date = sugar.Date.create(`${to} from now`);
                if (!_.isNaN(date.getTime())) {
                    toDate = date;
                }
            }
            if (!toDate) { // sugar
                const date = sugar.Date.create(to);
                if (!_.isNaN(date.getTime())) {
                    toDate = date;
                }
            }
            if (!toDate) { // to-time
                try {
                    const milliseconds = toTime(to).milliseconds();
                    toDate = new Date(from.getTime() + milliseconds);
                }
                catch (e) { }
            }
        }
        return toDate ? Math.round((toDate.getTime() - from.getTime()) / 1000) : 0;
    }
};
/* EXPORT */
exports.default = Time;
//# sourceMappingURL=time.js.map
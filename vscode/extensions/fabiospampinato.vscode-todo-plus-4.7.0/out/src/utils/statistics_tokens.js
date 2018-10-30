"use strict";
/* IMPORT */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const memoize = require("memoize-decorator");
const config_1 = require("../config");
const time_1 = require("./time");
/* STATISTICS TOKENS */
class StatisticsTokens {
    constructor() {
        this.comments = 0;
        this.projects = 0;
        this.tags = 0;
        this.pending = 0;
        this.done = 0;
        this.cancelled = 0;
        this.estSeconds = 0;
        this.lastedSeconds = 0;
        this.wastedSeconds = 0;
    }
    get finished() {
        return this.done + this.cancelled;
    }
    get all() {
        return this.pending + this.finished;
    }
    get percentage() {
        return this.all ? Math.round(this.finished / this.all * 100) : 100;
    }
    get est() {
        return this.formatTime(this.estSeconds, 'timekeeping.estimate.format');
    }
    get lasted() {
        return this.formatTime(this.lastedSeconds, 'timekeeping.elapsed.format');
    }
    get wasted() {
        return this.formatTime(this.wastedSeconds, 'timekeeping.elapsed.format');
    }
    get elapsed() {
        return this.formatTime(this.lastedSeconds + this.wastedSeconds, 'timekeeping.elapsed.format');
    }
    formatTime(seconds, format) {
        return seconds ? time_1.default.diff(Date.now() + seconds * 1000, undefined, config_1.default.getKey(format)) : '';
    }
}
StatisticsTokens.supported = ['comments', 'projects', 'tags', 'pending', 'done', 'cancelled', 'finished', 'all', 'percentage', 'est', 'lasted', 'wasted', 'elapsed'];
__decorate([
    memoize
], StatisticsTokens.prototype, "finished", null);
__decorate([
    memoize
], StatisticsTokens.prototype, "all", null);
__decorate([
    memoize
], StatisticsTokens.prototype, "percentage", null);
__decorate([
    memoize
], StatisticsTokens.prototype, "est", null);
__decorate([
    memoize
], StatisticsTokens.prototype, "lasted", null);
__decorate([
    memoize
], StatisticsTokens.prototype, "wasted", null);
__decorate([
    memoize
], StatisticsTokens.prototype, "elapsed", null);
/* EXPORT */
exports.default = StatisticsTokens;
//# sourceMappingURL=statistics_tokens.js.map
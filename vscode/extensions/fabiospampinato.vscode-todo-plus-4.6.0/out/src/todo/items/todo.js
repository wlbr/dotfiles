"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const moment = require("moment");
const config_1 = require("../../config");
const consts_1 = require("../../consts");
const utils_1 = require("../../utils");
const item_1 = require("./item");
/* TODO */
class Todo extends item_1.default {
    get lineNextText() {
        if (!_.isUndefined(this._lineNextText))
            return this._lineNextText;
        return this._lineNextText = (this.line ? this.line.text : this.text);
    }
    set lineNextText(val) {
        this._lineNextText = val;
    }
    /* EDIT */
    makeEdit() {
        return utils_1.default.editor.edits.makeDiff(this.line.text, this.lineNextText, this.line.lineNumber);
    }
    /* STATUS */
    makeStatus(state) {
        const status = {
            box: false,
            done: false,
            cancelled: false,
            other: false
        };
        status[state] = true;
        return status;
    }
    getStatus() {
        const box = this.isBox(), done = !box && this.isDone(), cancelled = !box && !done && this.isCancelled(), other = !box && !done && !cancelled;
        return { box, done, cancelled, other };
    }
    setStatus(is, was = this.getStatus()) {
        if (_.isEqual(is, was))
            return;
        if (was.other && !is.other) {
            this.create();
        }
        if (!was.other && is.other) {
            this.unfinish();
            this.unstart();
            this.uncreate();
        }
        if ((was.done || was.cancelled) && is.box) {
            this.unfinish();
        }
        if (((was.box || was.other) && (is.done || is.cancelled)) || (was.cancelled && is.done) || (was.done && is.cancelled)) {
            this.finish(is.done);
        }
    }
    /* TAGS */
    getTag(re) {
        const match = this.lineNextText.match(re);
        return match && match[0];
    }
    addTag(tag) {
        this.lineNextText = `${_.trimEnd(this.lineNextText)} ${tag}`;
    }
    removeTag(tagRegex) {
        if (!this.hasTag(tagRegex))
            return;
        this.lineNextText = _.trimEnd(this.lineNextText.replace(tagRegex, ''));
    }
    replaceTag(tagRegex, tag) {
        this.removeTag(tagRegex);
        this.addTag(tag);
    }
    hasTag(tagRegex) {
        return item_1.default.is(this.lineNextText, tagRegex);
    }
    /* TIMEKEEPING */
    create() {
        if (config_1.default.getKey('timekeeping.created.enabled')) {
            if (config_1.default.getKey('timekeeping.created.time')) {
                const date = moment(), format = config_1.default.getKey('timekeeping.created.format'), time = date.format(format), tag = `@created(${time})`;
                this.addTag(tag);
            }
            else {
                const tag = '@created';
                this.addTag(tag);
            }
        }
    }
    uncreate() {
        this.removeTag(consts_1.default.regexes.tagCreated);
    }
    toggleStart() {
        if (this.hasTag(consts_1.default.regexes.tagStarted)) {
            this.unstart();
        }
        else {
            this.start();
        }
    }
    start() {
        if (config_1.default.getKey('timekeeping.started.time')) {
            const date = moment(), format = config_1.default.getKey('timekeeping.started.format'), time = date.format(format), tag = `@started(${time})`;
            this.replaceTag(consts_1.default.regexes.tagStarted, tag);
        }
        else {
            const tag = '@started';
            this.replaceTag(consts_1.default.regexes.tagStarted, tag);
        }
    }
    unstart() {
        this.removeTag(consts_1.default.regexes.tagStarted);
    }
    finish(isPositive) {
        isPositive = _.isBoolean(isPositive) ? isPositive : this.isDone();
        const started = this.getTag(consts_1.default.regexes.tagStarted);
        if (started || config_1.default.getKey('timekeeping.finished.enabled') || consts_1.default.symbols.box === (isPositive ? consts_1.default.symbols.done : consts_1.default.symbols.cancelled)) {
            this.unfinish();
            /* FINISH */
            if (config_1.default.getKey('timekeeping.finished.time')) {
                const finishedDate = moment(), finishedFormat = config_1.default.getKey('timekeeping.finished.format'), finishedTime = finishedDate.format(finishedFormat), finishedTag = `@${isPositive ? 'done' : 'cancelled'}(${finishedTime})`;
                this.addTag(finishedTag);
            }
            else {
                const finishedTag = `@${isPositive ? 'done' : 'cancelled'}`;
                this.addTag(finishedTag);
            }
            /* ELAPSED */
            if (config_1.default.getKey('timekeeping.elapsed.enabled') && started) {
                const startedFormat = config_1.default.getKey('timekeeping.started.format'), startedMoment = moment(started, startedFormat), startedDate = new Date(startedMoment.valueOf()), elapsedFormat = config_1.default.getKey('timekeeping.elapsed.format'), time = utils_1.default.time.diff(new Date(), startedDate, elapsedFormat), elapsedTag = `@${isPositive ? 'lasted' : 'wasted'}(${time})`;
                this.addTag(elapsedTag);
            }
        }
    }
    unfinish() {
        this.removeTag(consts_1.default.regexes.tagFinished);
        this.removeTag(consts_1.default.regexes.tagElapsed);
    }
    /* SYMBOLS */
    setSymbol(symbol) {
        const match = this.lineNextText.match(consts_1.default.regexes.todoSymbol), firstChar = this.lineNextText.match(/\S/), startIndex = match ? match[0].indexOf(match[1]) : (firstChar ? firstChar.index : this.lineNextText.length), endIndex = match ? match[0].length : startIndex;
        this.lineNextText = `${this.lineNextText.substring(0, startIndex)}${symbol ? `${symbol} ` : ''}${this.lineNextText.substring(endIndex)}`;
    }
    setSymbolAndState(symbol, state) {
        const prevStatus = this.getStatus();
        this.setSymbol(symbol);
        const nextStatus = this.makeStatus(state);
        this.setStatus(nextStatus, prevStatus);
    }
    toggleBox(force = !this.isBox()) {
        const symbol = force ? consts_1.default.symbols.box : '', state = force ? 'box' : 'other';
        this.setSymbolAndState(symbol, state);
    }
    box() {
        this.toggleBox(true);
    }
    unbox() {
        this.toggleBox(false);
    }
    toggleDone(force = !this.isDone()) {
        const symbol = force ? consts_1.default.symbols.done : consts_1.default.symbols.box, state = force ? 'done' : 'box';
        this.setSymbolAndState(symbol, state);
    }
    done() {
        this.toggleDone(true);
    }
    undone() {
        this.toggleDone(false);
    }
    toggleCancelled(force = !this.isCancelled()) {
        const symbol = force ? consts_1.default.symbols.cancelled : consts_1.default.symbols.box, state = force ? 'cancelled' : 'box';
        this.setSymbolAndState(symbol, state);
    }
    cancelled() {
        this.toggleCancelled(true);
    }
    uncancelled() {
        this.toggleCancelled(false);
    }
    /* IS */
    isBox() {
        return item_1.default.is(this.text, consts_1.default.regexes.todoBox);
    }
    isDone() {
        return item_1.default.is(this.text, consts_1.default.regexes.todoDone);
    }
    isCancelled() {
        return item_1.default.is(this.text, consts_1.default.regexes.todoCancelled);
    }
    isFinished() {
        return this.isDone() || this.isCancelled();
    }
    static is(str) {
        return super.is(str, consts_1.default.regexes.todo);
    }
}
/* EXPORT */
exports.default = Todo;
//# sourceMappingURL=todo.js.map
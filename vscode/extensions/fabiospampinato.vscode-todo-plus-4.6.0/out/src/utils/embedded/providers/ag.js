"use strict";
/* IMPORT */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const execa = require("execa");
const string_matches_1 = require("string-matches");
const config_1 = require("../../../config");
const consts_1 = require("../../../consts");
const ackmate_1 = require("../../ackmate");
const folder_1 = require("../../folder");
const abstract_1 = require("./abstract");
/* AG */ // The Silver Searcher //URL: https://github.com/ggreer/the_silver_searcher
class AG extends abstract_1.default {
    execa(filePaths) {
        const config = config_1.default.get();
        return execa(AG.bin, ['--ackmate', '--nobreak', '--nocolor', '--heading', '--print-long-lines', '--silent', ...config.embedded.providers.ag.args, config.embedded.providers.ag.regex, ...filePaths]);
    }
    getAckmate(filePaths) {
        return __awaiter(this, void 0, void 0, function* () {
            filePaths = _.castArray(filePaths);
            if (!filePaths.length)
                return [];
            try {
                const { stdout } = yield this.execa(filePaths);
                return ackmate_1.default.parse(stdout);
            }
            catch (e) {
                console.log(e);
                return [];
            }
        });
    }
    filterAckmate(ackmate) {
        const filePaths = _.uniq(ackmate.map(obj => obj.filePath)), includedFilePaths = this.getIncluded(filePaths);
        return ackmate.filter(obj => includedFilePaths.includes(obj.filePath));
    }
    ackmate2data(ackmate) {
        ackmate.forEach(({ filePath, line: rawLine, lineNr }) => {
            const line = _.trimStart(rawLine), matches = string_matches_1.default(line, consts_1.default.regexes.todoEmbedded);
            if (!matches.length)
                return;
            const parsedPath = folder_1.default.parsePath(filePath);
            matches.forEach(match => {
                const data = {
                    todo: match[0],
                    type: match[1].toUpperCase(),
                    message: match[2],
                    code: line.slice(0, line.indexOf(match[0])),
                    rawLine,
                    line,
                    lineNr,
                    filePath,
                    root: parsedPath.root,
                    rootPath: parsedPath.rootPath,
                    relativePath: parsedPath.relativePath
                };
                if (!this.filesData[filePath])
                    this.filesData[filePath] = [];
                this.filesData[filePath].push(data);
            });
        });
    }
    initFilesData(rootPaths) {
        return __awaiter(this, void 0, void 0, function* () {
            const ackmate = this.filterAckmate(yield this.getAckmate(rootPaths));
            this.filesData = {};
            this.ackmate2data(ackmate);
        });
    }
    updateFilesData() {
        return __awaiter(this, void 0, void 0, function* () {
            const filePaths = Object.keys(this.filesData).filter(filePath => !this.filesData[filePath]), ackmate = yield this.getAckmate(filePaths);
            this.ackmate2data(ackmate);
            this.filesData = _.transform(this.filesData, (acc, val, key) => {
                if (!val)
                    return;
                acc[key] = val;
            }, {});
        });
    }
}
AG.bin = 'ag';
/* EXPORT */
exports.default = AG;
//# sourceMappingURL=ag.js.map
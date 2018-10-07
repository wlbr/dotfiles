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
const globby = require("globby");
const string_matches_1 = require("string-matches");
const consts_1 = require("../../../consts");
const file_1 = require("../../file");
const folder_1 = require("../../folder");
const abstract_1 = require("./abstract");
/* JS */
class JS extends abstract_1.default {
    getFilePaths(rootPaths) {
        return __awaiter(this, void 0, void 0, function* () {
            return _.flatten(yield Promise.all(rootPaths.map(cwd => globby(this.include, { cwd, ignore: this.exclude, dot: true, absolute: true }))));
        });
    }
    initFilesData(rootPaths) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePaths = yield this.getFilePaths(rootPaths);
            this.filesData = {};
            yield Promise.all(filePaths.map((filePath) => __awaiter(this, void 0, void 0, function* () {
                this.filesData[filePath] = yield this.getFileData(filePath);
            })));
        });
    }
    updateFilesData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (_.isEmpty(this.filesData))
                return;
            yield Promise.all(_.map(this.filesData, (val, filePath) => __awaiter(this, void 0, void 0, function* () {
                if (val)
                    return;
                this.filesData[filePath] = yield this.getFileData(filePath);
            })));
        });
    }
    getFileData(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = [], content = yield file_1.default.read(filePath);
            if (!content)
                return data;
            const lines = content.split(/\r?\n/);
            let parsedPath;
            lines.forEach((rawLine, lineNr) => {
                const line = _.trimStart(rawLine), matches = string_matches_1.default(line, consts_1.default.regexes.todoEmbedded);
                if (!matches.length)
                    return;
                if (!parsedPath) {
                    parsedPath = folder_1.default.parsePath(filePath);
                }
                matches.forEach(match => {
                    data.push({
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
                    });
                });
            });
            return data;
        });
    }
}
;
/* EXPORT */
exports.default = JS;
//# sourceMappingURL=js.js.map
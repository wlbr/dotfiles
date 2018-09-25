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
const chokidar = require("chokidar");
const micromatch = require("micromatch");
const querystring = require("querystring");
const config_1 = require("../../../config");
const folder_1 = require("../../folder");
/* ABSTRACT */
class Abstract {
    constructor() {
        this.include = undefined;
        this.exclude = undefined;
        this.rootPaths = undefined;
        this.filesData = undefined; // { [filePath]: todo[] | undefined }
        this.watcher = undefined;
    }
    get(rootPaths = folder_1.default.getAllRootPaths(), groupByRoot = true, groupByType = true, groupByFile = true, filter = false) {
        return __awaiter(this, void 0, void 0, function* () {
            rootPaths = _.castArray(rootPaths);
            const config = config_1.default.get();
            this.include = config.embedded.include;
            this.exclude = config.embedded.exclude;
            if (!this.filesData || !_.isEqual(this.rootPaths, rootPaths)) {
                this.rootPaths = rootPaths;
                this.unwatchPaths();
                yield this.initFilesData(rootPaths);
                this.watchPaths(rootPaths);
            }
            else {
                yield this.updateFilesData();
            }
            return this.getTodos(groupByRoot, groupByType, groupByFile, filter);
        });
    }
    watchPaths(rootPaths) {
        return __awaiter(this, void 0, void 0, function* () {
            /* HELPERS */
            const pathNormalizer = filePath => filePath.replace(/\\/g, '/');
            /* HANDLERS */
            const add = filePath => {
                if (!this.filesData)
                    return;
                filePath = pathNormalizer(filePath);
                if (this.filesData.hasOwnProperty(filePath))
                    return;
                if (!this.isIncluded(filePath))
                    return;
                this.filesData[filePath] = undefined;
            };
            const change = filePath => {
                if (!this.filesData)
                    return;
                filePath = pathNormalizer(filePath);
                if (!this.filesData.hasOwnProperty(filePath))
                    return;
                this.filesData[filePath] = undefined;
            };
            const unlink = filePath => {
                if (!this.filesData)
                    return;
                filePath = pathNormalizer(filePath);
                delete this.filesData[filePath];
            };
            /* WATCHING */
            if (!rootPaths.length)
                return;
            const chokidarOptions = {
                ignored: this.exclude,
                ignoreInitial: true
            };
            this.watcher = chokidar.watch(rootPaths, chokidarOptions).on('add', add).on('change', change).on('unlink', unlink);
        });
    }
    unwatchPaths() {
        if (!this.watcher)
            return;
        this.watcher.close();
    }
    getIncluded(filePaths) {
        return micromatch(filePaths, this.include, { ignore: this.exclude, dot: true });
    }
    isIncluded(filePath) {
        return !!this.getIncluded([filePath]).length;
    }
    initFilesData(rootPaths) {
        return __awaiter(this, void 0, void 0, function* () {
            this.filesData = {};
        });
    }
    updateFilesData() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    getTodos(groupByRoot, groupByType, groupByFile, filter) {
        if (_.isEmpty(this.filesData))
            return;
        const todos = {}, // { [ROOT] { [TYPE] => { [FILEPATH] => [DATA] } } }
        filterRe = filter ? new RegExp(_.escapeRegExp(filter), 'i') : false, filePaths = Object.keys(this.filesData);
        filePaths.forEach(filePath => {
            const data = this.filesData[filePath];
            if (!data || !data.length)
                return;
            const filePathGroup = groupByFile ? filePath : '';
            data.forEach(datum => {
                if (filterRe && !filterRe.test(datum.line))
                    return;
                const rootGroup = groupByRoot ? datum.root : '';
                if (!todos[rootGroup])
                    todos[rootGroup] = {};
                const typeGroup = groupByType ? datum.type : '';
                if (!todos[rootGroup][typeGroup])
                    todos[rootGroup][typeGroup] = {};
                if (!todos[rootGroup][typeGroup][filePathGroup])
                    todos[rootGroup][typeGroup][filePathGroup] = [];
                todos[rootGroup][typeGroup][filePathGroup].push(datum);
            });
        });
        const roots = Object.keys(todos);
        return roots.length > 1 ? todos : { '': todos[roots[0]] };
    }
    renderTodos(todos) {
        if (_.isEmpty(todos))
            return '';
        const sepRe = new RegExp(querystring.escape('/'), 'g'), config = config_1.default.get(), { indentation, embedded: { file: { wholeLine } }, symbols: { box } } = config, lines = [];
        /* LINES */
        const roots = Object.keys(todos).sort();
        roots.forEach(root => {
            if (root) {
                lines.push(`\n${root}:`);
            }
            const types = Object.keys(todos[root]).sort();
            types.forEach(type => {
                if (type) {
                    lines.push(`${root ? indentation : '\n'}${type}:`);
                }
                const filePaths = Object.keys(todos[root][type]).sort();
                filePaths.forEach(filePath => {
                    if (filePath) {
                        const normalizedFilePath = `/${_.trimStart(filePath, '/')}`, encodedFilePath = querystring.escape(normalizedFilePath).replace(sepRe, '/');
                        lines.push(`${root ? indentation : ''}${type ? indentation : ''}@file://${encodedFilePath}`);
                    }
                    const data = todos[root][type][filePath];
                    data.forEach(datum => {
                        const normalizedFilePath = `/${_.trimStart(datum.filePath, '/')}`, encodedFilePath = querystring.escape(normalizedFilePath).replace(sepRe, '/');
                        lines.push(`${root ? indentation : ''}${type ? indentation : ''}${filePath ? indentation : ''}${box} ${_.trimStart(wholeLine ? datum.line : datum.message)} @file://${encodedFilePath}#${datum.lineNr + 1}`);
                    });
                });
            });
        });
        return lines.length ? `${lines.join('\n')}\n` : '';
    }
}
/* EXPORT */
exports.default = Abstract;
//# sourceMappingURL=abstract.js.map
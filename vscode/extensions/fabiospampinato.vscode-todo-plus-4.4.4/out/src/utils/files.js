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
const globby = require("globby");
const micromatch = require("micromatch");
const vscode = require("vscode");
const config_1 = require("../config");
const folder_1 = require("./folder");
/* FILES */
class Files {
    constructor() {
        this.include = undefined;
        this.exclude = undefined;
        this.rootPaths = undefined;
        this.filesData = undefined; // { [filePath]: todo | undefined }
        this.watcher = undefined;
    }
    get(rootPaths = folder_1.default.getAllRootPaths()) {
        return __awaiter(this, void 0, void 0, function* () {
            rootPaths = _.castArray(rootPaths);
            const config = config_1.default.get();
            this.include = config.file.include;
            this.exclude = config.file.exclude;
            if (!this.filesData || !_.isEqual(this.rootPaths, rootPaths)) {
                this.rootPaths = rootPaths;
                this.unwatchPaths();
                yield this.initFilesData(rootPaths);
                this.watchPaths(rootPaths);
            }
            else {
                yield this.updateFilesData();
            }
            this.updateContext();
            return this.getTodos();
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
            const parsedPath = folder_1.default.parsePath(filePath), textEditor = yield vscode.workspace.openTextDocument(filePath);
            return {
                textEditor,
                filePath,
                root: parsedPath.root,
                rootPath: parsedPath.rootPath,
                relativePath: parsedPath.relativePath
            };
        });
    }
    getTodos() {
        if (_.isEmpty(this.filesData))
            return;
        const todos = {}, // { [ROOT] { { [FILEPATH] => [DATA] } }
        filePaths = Object.keys(this.filesData);
        filePaths.forEach(filePath => {
            const data = this.filesData[filePath];
            if (!data)
                return;
            if (!todos[data.root])
                todos[data.root] = {};
            todos[data.root][filePath] = data;
        });
        return this.simplifyTodos(todos);
    }
    simplifyTodos(obj) {
        if (_.isObject(obj)) {
            const keys = Object.keys(obj);
            if (keys.length === 1) {
                obj[''] = this.simplifyTodos(obj[keys[0]]);
            }
        }
        return obj;
    }
    updateContext() {
        const filesNr = Object.keys(this.filesData).length;
        vscode.commands.executeCommand('setContext', 'todo-files-open-button', filesNr <= 1);
    }
}
/* EXPORT */
exports.default = new Files();
//# sourceMappingURL=files.js.map
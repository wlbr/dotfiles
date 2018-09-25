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
const vscode = require("vscode");
const items_1 = require("../todo/items");
const document_1 = require("../todo/document");
const config_1 = require("../config");
const consts_1 = require("../consts");
const ast_1 = require("./ast");
const editor_1 = require("./editor");
/* ARCHIVE */
const Archive = {
    get(doc, insert = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let archive = doc.getArchive();
            if (archive)
                return archive;
            if (insert) {
                const config = config_1.default.get(), pos = doc.textDocument.positionAt(Infinity), // Last pos
                text = `\n${config.archive.name}${consts_1.default.symbols.project}\n`, edit = editor_1.default.edits.makeInsert(text, pos.line, pos.character);
                yield editor_1.default.edits.apply(doc.textEditor, [edit]);
                return doc.getArchive();
            }
        });
    },
    run(doc) {
        return __awaiter(this, void 0, void 0, function* () {
            const archive = yield Archive.get(doc), archivableRange = new vscode.Range(0, 0, archive ? archive.line.range.start.line : Infinity, archive ? archive.line.range.start.character : Infinity), archivableText = doc.textDocument.getText(archivableRange), archivableDoc = new document_1.default(doc.textDocument);
            archivableDoc.text = archivableText;
            const data = {
                remove: [],
                insert: {} // Map of `lineNumber => text` to insert
            };
            for (let transformation of Archive.transformations.order) {
                Archive.transformations[transformation](archivableDoc, data);
            }
            Archive.edit(doc, data);
        });
    },
    edit(doc, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const removeLines = _.uniqBy(data.remove, line => line['lineNumber']), //TSC
            insertLines = _.sortBy(_.map(data.insert, (text, lineNumber) => ({ text, lineNumber })), [line => line.lineNumber]).map(line => line['text']), //TSC
            edits = [];
            removeLines.forEach(line => {
                edits.push(editor_1.default.edits.makeDeleteLine(line.lineNumber));
            });
            if (insertLines.length) {
                const archive = yield Archive.get(doc, true), insertText = `${consts_1.default.indentation}${insertLines.join(`\n${consts_1.default.indentation}`)}\n`;
                edits.push(editor_1.default.edits.makeInsert(insertText, archive.line.range.start.line + 1, 0));
            }
            editor_1.default.edits.apply(doc.textEditor, edits);
        });
    },
    transformations: {
        order: ['addTodosDone', 'addTodosCancelled', 'addTodosComments', 'addProjectTag', 'removeEmptyProjects', 'removeEmptyLines'],
        addTodosDone(doc, data) {
            const todosDone = doc.getTodosDone(), lines = todosDone.map(todo => todo.line);
            lines.forEach(line => {
                data.remove.push(line);
                data.insert[line.lineNumber] = _.trimStart(line.text);
            });
        },
        addTodosCancelled(doc, data) {
            const todosCancelled = doc.getTodosCancelled(), lines = todosCancelled.map(todo => todo.line);
            lines.forEach(line => {
                data.remove.push(line);
                data.insert[line.lineNumber] = _.trimStart(line.text);
            });
        },
        addTodosComments(doc, data) {
            data.remove.forEach(line => {
                ast_1.default.walkDown(doc.textDocument, line.lineNumber, true, false, function ({ startLevel, line, level }) {
                    if (startLevel === level || !items_1.Comment.is(line.text))
                        return false;
                    data.remove.push(line);
                    data.insert[line.lineNumber] = `${consts_1.default.indentation}${_.trimStart(line.text)}`;
                });
            });
        },
        addProjectTag(doc, data) {
            if (!config_1.default.getKey('archive.project.enabled'))
                return;
            data.remove.forEach(line => {
                if (!items_1.Todo.is(line.text))
                    return;
                const projects = [];
                ast_1.default.walkUp(doc.textDocument, line.lineNumber, true, true, function ({ line }) {
                    if (!items_1.Project.is(line.text))
                        return;
                    const parts = line.text.match(consts_1.default.regexes.projectParts);
                    projects.push(parts[2]);
                });
                if (!projects.length)
                    return;
                data.insert[line.lineNumber] = `${data.insert[line.lineNumber]} ${consts_1.default.symbols.tag}project(${projects.reverse().join(config_1.default.getKey('archive.project.separator'))})`;
            });
        },
        removeEmptyProjects(doc, data) {
            if (!config_1.default.getKey('archive.remove.emptyProjects'))
                return;
            const projects = doc.getProjects();
            projects.forEach(project => {
                const lines = [project.line];
                let isEmpty = true;
                ast_1.default.walkDown(doc.textDocument, project.line.lineNumber, true, false, function ({ startLevel, line, level }) {
                    if (startLevel === level)
                        return false;
                    if (items_1.TodoBox.is(line.text))
                        return isEmpty = false;
                    lines.push(line);
                });
                if (!isEmpty)
                    return;
                data.remove.push(...lines);
            });
        },
        removeEmptyLines(doc, data) {
            const emptyLines = config_1.default.getKey('archive.remove.emptyLines');
            if (emptyLines < 0)
                return;
            let streak = 0; // Number of consecutive empty lines
            ast_1.default.walkDown(doc.textDocument, -1, false, false, function ({ startLevel, line, level }) {
                if (data.remove.find(other => other === line))
                    return;
                if (line.text && !consts_1.default.regexes.empty.test(line.text)) {
                    streak = 0;
                }
                else {
                    streak++;
                    if (streak > emptyLines) {
                        data.remove.push(line);
                    }
                }
            });
        }
    }
};
/* EXPORT */
exports.default = Archive;
//# sourceMappingURL=archive.js.map
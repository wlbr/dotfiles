"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const vscode = require("vscode");
const consts_1 = require("../consts");
const utils_1 = require("../utils");
const document_1 = require("../todo/document");
/* SYMBOLS */
class Symbols {
    provideDocumentSymbols(textDocument) {
        const doc = new document_1.default(textDocument), projects = doc.getProjects(), projectsDatas = [], symbols = [];
        projects.forEach(project => {
            /* SYMBOL */
            const parts = project.line.text.match(consts_1.default.regexes.projectParts), level = utils_1.default.ast.getLevel(parts[1]), name = _.trim(parts[2]), selectionRange = project.range, startLine = selectionRange.start.line, startCharacter = selectionRange.start.character;
            let endLine = startLine;
            utils_1.default.ast.walkDown(doc.textDocument, startLine, true, false, ({ startLevel, level, line }) => {
                if (level <= startLevel)
                    return false;
                endLine = line.lineNumber;
            });
            const endCharacter = doc.textDocument.lineAt(endLine).range.end.character, fullRange = new vscode.Range(startLine, startCharacter, endLine, endCharacter), symbol = new vscode.DocumentSymbol(name, undefined, vscode.SymbolKind.Field, fullRange, selectionRange);
            projectsDatas.push({ level, name, symbol });
            /* PARENT */
            const parentData = _.findLast(projectsDatas, data => data.level < level) || {}, { symbol: parentSymbol } = parentData;
            if (parentSymbol) {
                parentSymbol.children.push(symbol);
            }
            else {
                symbols.push(symbol);
            }
        });
        return symbols;
    }
}
/* EXPORT */
exports.default = Symbols;
//# sourceMappingURL=symbols.js.map
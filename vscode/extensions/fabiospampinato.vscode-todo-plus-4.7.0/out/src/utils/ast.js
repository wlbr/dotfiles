"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../consts");
/* AST */
const AST = {
    getLevel(str, indentation = consts_1.default.indentation) {
        let level = 0, index = 0;
        while (index < str.length) {
            if (str.substr(index, indentation.length) === indentation) {
                level++;
                index += indentation.length;
            }
            else if (str[index] === '\t') {
                level++;
                index += 1;
            }
            else {
                break;
            }
        }
        return level;
    },
    /* WALK */
    walk(textDocument, lineNr = 0, direction = 1, skipEmptyLines = true, strictlyMonotonic = false, callback) {
        // strictlyMonotonic: only go strictly up or down, don't process other elements at the same level
        const { lineCount } = textDocument;
        const startLine = lineNr >= 0 ? textDocument.lineAt(lineNr) : null, startLevel = startLine ? AST.getLevel(startLine.text) : -1;
        let prevLevel = startLevel, nextLine = lineNr + direction;
        while (nextLine >= 0 && nextLine < lineCount) {
            const line = textDocument.lineAt(nextLine);
            if (skipEmptyLines && (!line.text || consts_1.default.regexes.empty.test(line.text))) {
                nextLine += direction;
                continue;
            }
            const level = AST.getLevel(line.text);
            if (direction > 0 && level < startLevel)
                break;
            if (strictlyMonotonic && ((direction > 0 && level <= prevLevel) || (direction < 0 && level >= prevLevel))) {
                nextLine += direction;
                continue;
            }
            if (callback({ startLine, startLevel, line, level }) === false)
                break;
            prevLevel = level;
            nextLine += direction;
        }
    },
    walkDown(textDocument, lineNr, skipEmptyLines, strictlyMonotonic, callback) {
        return AST.walk(textDocument, lineNr, 1, skipEmptyLines, strictlyMonotonic, callback);
    },
    walkUp(textDocument, lineNr, skipEmptyLines, strictlyMonotonic, callback) {
        return AST.walk(textDocument, lineNr, -1, skipEmptyLines, strictlyMonotonic, callback);
    },
    walkChildren(textDocument, lineNr, callback) {
        return AST.walkDown(textDocument, lineNr, true, false, function ({ startLine, startLevel, line, level }) {
            if (level <= startLevel)
                return false;
            if (level > (startLevel + 1))
                return;
            callback.apply(undefined, arguments);
        });
    }
};
/* EXPORT */
exports.default = AST;
//# sourceMappingURL=ast.js.map
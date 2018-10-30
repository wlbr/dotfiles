"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const vscode = require("vscode");
const consts_1 = require("../consts");
const document_1 = require("../todo/document");
/* COMPLETION */
class Completion {
    provideCompletionItems(textDocument, pos) {
        const character = textDocument.lineAt(pos.line).text[pos.character - 1];
        if (!character || !_.trim(character).length || _.includes(Completion.triggerCharacters, character)) {
            /* SPECIAL */
            const tagsSpecial = consts_1.default.tags.names.map(tag => {
                const text = `@${tag}`, item = new vscode.CompletionItem(text);
                item.insertText = `${text} `;
                return item;
            });
            /* SMART */
            const doc = new document_1.default(textDocument), tags = _.uniq(doc.getTags().map(tag => tag.text)), tagsFiltered = tags.filter(tag => consts_1.default.regexes.tagNormal.test(tag));
            const tagsSmart = tagsFiltered.map(text => {
                const item = new vscode.CompletionItem(text);
                item.insertText = `${text} `;
                return item;
            });
            return tagsSpecial.concat(tagsSmart);
        }
        return null; // Word-based suggestions
    }
}
Completion.triggerCharacters = [consts_1.default.symbols.tag];
/* EXPORT */
exports.default = Completion;
//# sourceMappingURL=completion.js.map
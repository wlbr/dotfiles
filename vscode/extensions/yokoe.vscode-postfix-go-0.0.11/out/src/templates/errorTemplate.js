"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const completionItemBuilder_1 = require("../completionItemBuilder");
const baseTemplates_1 = require("./baseTemplates");
const utils_1 = require("../utils");
class ErrorTemplate extends baseTemplates_1.BaseExpressionTemplate {
    buildCompletionItem(code, position) {
        return completionItemBuilder_1.CompletionItemBuilder
            .create('error', code)
            .description(`errors.New("Error Message")`)
            .replace(`errors.New(\${1:{{expr}}})`, position, true)
            .build();
    }
}
exports.ErrorTemplate = ErrorTemplate;
class MustTemplate extends baseTemplates_1.BaseExpressionTemplate {
    buildCompletionItem(code, position) {
        return completionItemBuilder_1.CompletionItemBuilder
            .create('must', code)
            .description(`Must checks for nil and returns if expression != nil.`)
            .replace(`if \${1:{{expr}}} != nil {\n${utils_1.getIndentCharacters()}return \${2:nil}, \${1:{{expr}}}\${0}\n}`, position, true)
            .build();
    }
}
exports.MustTemplate = MustTemplate;
exports.build = () => [
    new ErrorTemplate(),
    new MustTemplate()
];
//# sourceMappingURL=errorTemplate.js.map
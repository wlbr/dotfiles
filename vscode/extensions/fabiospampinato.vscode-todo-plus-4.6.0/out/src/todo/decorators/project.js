"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const config_1 = require("../../config");
const consts_1 = require("../../consts");
const utils_1 = require("../../utils");
const line_1 = require("./line");
/* DECORATION TYPES */
const PROJECT_BASIC = vscode.window.createTextEditorDecorationType({
    color: consts_1.default.colors.project,
    rangeBehavior: vscode.DecorationRangeBehavior.OpenClosed
});
const PROJECT_STATISTICS = () => ({
    color: consts_1.default.colors.project,
    rangeBehavior: vscode.DecorationRangeBehavior.OpenClosed,
    after: {
        contentText: undefined,
        color: consts_1.default.colors.projectStatistics,
        margin: '.05em 0 .05em .5em',
        textDecoration: ';font-size: .9em'
    }
});
const StatisticsTypes = {
    types: {},
    get(contentText, textEditor) {
        const decorations = PROJECT_STATISTICS();
        decorations.after.contentText = contentText;
        const type = vscode.window.createTextEditorDecorationType(decorations);
        const id = textEditor.document.uri.fsPath;
        if (!StatisticsTypes.types[id])
            StatisticsTypes.types[id] = [];
        StatisticsTypes.types[id].push(type);
        return type;
    },
    reset(textEditor) {
        const id = textEditor.document.uri.fsPath;
        if (!StatisticsTypes.types[id])
            return;
        StatisticsTypes.types[id].forEach(type => textEditor.setDecorations(type, []));
        StatisticsTypes.types[id] = [];
    }
};
/* PROJECT */
class Project extends line_1.default {
    constructor() {
        super(...arguments);
        this.TYPES = [PROJECT_BASIC];
    }
    getDecorations(projects) {
        const condition = config_1.default.getKey('statistics.project.enabled');
        if (condition === false)
            return super.getDecorations(projects);
        const textEditor = projects.length ? projects[0].textEditor : vscode.window.activeTextEditor;
        StatisticsTypes.reset(textEditor);
        const template = config_1.default.getKey('statistics.project.text'), basicRanges = [], statisticsData = [];
        projects.forEach(project => {
            const ranges = this.getItemRanges(project), tokens = utils_1.default.statistics.tokens.projects[project.lineNumber], withStatistics = utils_1.default.statistics.condition.is(condition, utils_1.default.statistics.tokens.global, tokens);
            if (withStatistics) {
                const contentText = utils_1.default.statistics.template.render(template, tokens), type = StatisticsTypes.get(contentText, textEditor);
                statisticsData.push({ type, ranges });
            }
            else {
                basicRanges.push(ranges[0]);
            }
        });
        return [
            {
                type: PROJECT_BASIC,
                ranges: basicRanges
            },
            ...statisticsData
        ];
    }
}
/* EXPORT */
exports.default = Project;
//# sourceMappingURL=project.js.map
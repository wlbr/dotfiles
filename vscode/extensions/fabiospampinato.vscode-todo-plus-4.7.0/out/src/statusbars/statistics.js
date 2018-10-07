"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const config_1 = require("../config");
const utils_1 = require("../utils");
/* STATISTICS */
class Statistics {
    constructor() {
        this.item = this._initItem();
        this.itemProps = {};
        this.update();
    }
    _initItem() {
        const alignment = config_1.default.getKey('statistics.statusbar.alignment') === 'right' ? vscode.StatusBarAlignment.Right : vscode.StatusBarAlignment.Left, priority = config_1.default.getKey('statistics.statusbar.priority');
        return vscode.window.createStatusBarItem(alignment, priority);
    }
    _setItemProp(prop, value, _set = true) {
        if (this.itemProps[prop] === value)
            return false;
        this.itemProps[prop] = value;
        if (_set) {
            this.item[prop] = value;
        }
        return true;
    }
    update() {
        this.config = config_1.default.get();
        this.tokens = utils_1.default.statistics.tokens.global;
        this.updateVisibility();
        if (!this.itemProps.visibility)
            return;
        this.updateColor();
        this.updateCommand();
        this.updateTooltip();
        this.updateText();
    }
    updateColor() {
        const { color } = this.config.statistics.statusbar;
        this._setItemProp('color', color);
    }
    updateCommand() {
        const { command } = this.config.statistics.statusbar;
        this._setItemProp('command', command);
    }
    updateTooltip() {
        let template = this.config.statistics.statusbar.tooltip, tooltip = utils_1.default.statistics.template.render(template, this.tokens);
        if (!tooltip)
            return;
        this._setItemProp('tooltip', tooltip);
    }
    updateText() {
        let template = this.config.statistics.statusbar.text, text = utils_1.default.statistics.template.render(template, this.tokens);
        if (!text)
            return;
        this._setItemProp('text', text);
    }
    updateVisibility() {
        const condition = this.config.statistics.statusbar.enabled, visibility = utils_1.default.editor.isSupported(vscode.window.activeTextEditor) && utils_1.default.statistics.condition.is(condition, this.tokens, undefined);
        if (this._setItemProp('visibility', visibility)) {
            this.item[visibility ? 'show' : 'hide']();
        }
    }
}
/* EXPORT */
exports.default = new Statistics();
//# sourceMappingURL=statistics.js.map
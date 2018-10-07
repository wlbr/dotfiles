"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const sha1 = require("sha1");
const vscode = require("vscode");
const consts_1 = require("../consts");
/* VIEW */
const View = {
    uris: {},
    getURI({ filePath, relativePath }) {
        if (View.uris[filePath])
            return View.uris[filePath];
        const uri = vscode.Uri.file(filePath);
        uri['label'] = _.trimStart(relativePath, '\\/');
        View.uris[filePath] = uri;
        return uri;
    },
    icons: {},
    getTypeIcon(type) {
        if (View.icons[type])
            return View.icons[type];
        if (!consts_1.default.colors.types[type])
            return;
        const { context } = require('.').default, // Avoiding a cyclic dependency
        color = consts_1.default.colors.types[type], colorHash = sha1(color), iconPath = path.join(context.storagePath, `type-color-${colorHash}.svg`);
        mkdirp.sync(context.storagePath);
        if (!fs.existsSync(iconPath)) {
            const image = `<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve"><circle fill="${color}" cx="8" cy="8" r="5.4"/></svg>`;
            fs.writeFileSync(iconPath, image);
        }
        View.icons[type] = iconPath;
        return iconPath;
    }
};
/* EXPORT */
exports.default = View;
//# sourceMappingURL=view.js.map
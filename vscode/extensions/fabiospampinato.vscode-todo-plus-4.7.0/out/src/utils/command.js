"use strict";
/* IMPORT */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
/* COMMAND */
const Command = {
    proxiesHashes: [],
    get(command, args) {
        if (!args)
            return command;
        const hash = `${command}${JSON.stringify(args)}`, exists = !!Command.proxiesHashes.find(h => h === hash);
        if (exists)
            return hash;
        vscode.commands.registerCommand(hash, () => {
            vscode.commands.executeCommand(command, ...args);
        });
        Command.proxiesHashes.push(hash);
        return hash;
    }
};
/* EXPORT */
exports.default = Command;
//# sourceMappingURL=command.js.map
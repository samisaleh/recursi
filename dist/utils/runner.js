"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
exports.executeSystemCommand = function (command, suppress = true) {
    try {
        const result = child_process_1.execSync(command);
        if (!suppress) {
            console.log(result.toString());
        }
    }
    catch ({ stdout }) {
        return stdout.toString();
    }
};
//# sourceMappingURL=runner.js.map
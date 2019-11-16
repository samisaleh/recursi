import { execSync } from 'child_process';

export const executeSystemCommand = function(command: string, suppress = true): string | void {
    try {
        const result = execSync(command);
        if (!suppress) {
            console.log(result.toString());
        }
    } catch ({ stdout }) {
        return stdout.toString();
    }
};

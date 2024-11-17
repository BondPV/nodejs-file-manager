import { rename } from 'node:fs/promises';
import { checkFileExists } from './checkFileExists.js';

export const renameFile = async (args) => {
    try {
        const [oldPath, newPath] = args || [];

        if (!oldPath || !newPath) {
            throw new Error('Missing arguments to command');
        }

        await checkFileExists(oldPath);

        await rename(oldPath, newPath);
    } catch (e) {
        console.error(`Operation failed: ${e.message}`);
    }
};

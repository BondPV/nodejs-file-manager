import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import { getCurrentDirectory } from "../helpers.js";

export const createEmptyFile = async (fileName) => {
    try {
        if (!fileName) {
            throw new Error('Missing argument to command');
        }

        const filePath = path.join(getCurrentDirectory(), fileName);

        await writeFile(filePath, '', { flag: 'wx' });
    } catch (e) {
        console.error(`Operation failed: ${e.message}`);
    }
};

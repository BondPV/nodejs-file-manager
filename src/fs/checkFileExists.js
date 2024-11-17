import { promises } from 'node:fs';

export const checkFileExists = async (filePath) => {
    try {
        await promises.access(filePath);
    } catch (_e) {
        throw new Error(`File not found: ${filePath}`);
    }
};

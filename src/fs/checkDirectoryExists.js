import { promises } from 'node:fs';

export const checkDirectoryExists = async (dirPath) => {
    try {
        await promises.access(dirPath);
    } catch {
        await promises.mkdir(dirPath, { recursive: true });
    }
};

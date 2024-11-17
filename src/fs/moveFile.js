import { copyFile } from './copyFile.js';
import { removeFile } from './removeFile.js';

export const moveFile = async (args) => {
    try {
        const [filePath, newDirPath] = args || [];
        
        if (!filePath || !newDirPath) {
            throw new Error('Missing arguments to command');
        }

        await copyFile(args);
        await removeFile(filePath);
    } catch (e) {
        console.error(`Operation failed: ${e.message}`);
    }
};

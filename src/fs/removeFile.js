import fs from 'node:fs/promises';

export const removeFile = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error('Missing argument to command"');
        }

        await fs.unlink(filePath);
    } catch (e) {
        console.error(`Operation failed: ${e.message}`);
    }
};

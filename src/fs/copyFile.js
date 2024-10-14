import path from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { access } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { checkFileExists } from './checkFileExists.js';
import { checkDirectoryExists } from './checkDirectoryExists.js';

const copyFileStream = async (source, destination) => {
    const readStream = createReadStream(source);
    const writeStream = createWriteStream(destination);

    await pipeline(readStream, writeStream);
};

export const copyFile = async (args) => {
    try {
        const [filePath, newDirPath] = args || [];
        
        if (!filePath || !newDirPath) {
            throw new Error('Missing arguments to command');
        }

        await checkFileExists(filePath);

        await checkDirectoryExists(newDirPath);

        const fileName = path.basename(filePath);
        const newFilePath = path.join(newDirPath, fileName);

        try {
            await access(newFilePath);

            throw new Error(`File already exists: ${newFilePath}`);
        } catch (e) {
            if (e.code !== 'ENOENT') {
                throw e;
            }
        }
        
        await copyFileStream(filePath, newFilePath);
    } catch (e) {
        console.error(`Operation failed: ${e.message}`);
    }
};

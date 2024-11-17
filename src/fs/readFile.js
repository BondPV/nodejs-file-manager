import { createReadStream } from 'node:fs';
import { checkFileExists } from './checkFileExists.js';

export const readFile = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error('Missing argument to command');
        }

        await checkFileExists(filePath);

        const readStream = createReadStream(filePath, { encoding: 'utf-8' });

        await new Promise((res, rej) => {
            readStream.on('data', (chunk) => console.log(chunk));
            readStream.on('end', () => {
                console.log('Finished reading file.');
                res();
            });
            readStream.on('error', (e) => {
                rej(e);
            });
        });
    } catch (e) {
        console.error(`Operation failed: ${e.message}`);
    }
};

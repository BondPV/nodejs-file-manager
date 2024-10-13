import { createReadStream, promises as fsPromises } from 'node:fs';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

const pipelineAsync = promisify(pipeline);

export const readFile = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error('Missing argument to command');
        }

        const readStream = createReadStream(filePath, 'utf-8');

        await pipelineAsync(readStream, process.stdout);
    } catch (e) {
        console.error(`Operation failed: ${e.message}`);
    }
};

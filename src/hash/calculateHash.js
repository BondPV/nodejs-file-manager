import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

const pipelineAsync = promisify(pipeline);

export const calculateHash = async (file) => {
    try {
        const hash = createHash('sha256');
        const readStream = createReadStream(file);

        await pipelineAsync(readStream, hash);

        console.log('Hash:', hash.digest('hex'));
    } catch (e) {
        console.log(`Operation failed ${e.message}`);
    }
};

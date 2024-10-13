import path from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { checkFileExists } from '../fs/checkFileExists.js';
import { checkDirectoryExists } from '../fs/checkDirectoryExists.js';

export const archiveFile = async (args, operation = 'compress') => {
    try {
        const [inputFile, outputFile] = args || [];
        
        if (!inputFile || !outputFile) {
            throw new Error('Missing arguments to command');
        }

        await checkFileExists(inputFile);

        const outputDir = path.dirname(outputFile);
        await checkDirectoryExists(outputDir);

        const readStream = createReadStream(inputFile);
        const writeStream = createWriteStream(outputFile);
        const compressor = operation === 'compress' ? createBrotliCompress() : createBrotliDecompress();

        await pipeline(readStream, compressor, writeStream);
    } catch (e) {
        console.log(`Operation failed: ${e.message}`);
    }
};

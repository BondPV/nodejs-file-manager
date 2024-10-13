import process from 'node:process';
import { readFile } from './fs/readFile.js';
import { createEmptyFile } from './fs/createEmptyFile.js';
import { renameFile } from './fs/renameFile.js';
import { copyFile } from './fs/copyFile.js';
import { moveFile } from './fs/moveFile.js';
import { removeFile } from './fs/removeFile.js';
import { homeDir, printOsInfo } from './os/printOsInfo.js';
import { changeDirectory } from './cd/changeDirectory.js';
import { printFilesList } from './ls/printFilesList.js';
import { changeDirectoryUp } from './up/changeDirectoryUp.js';
import { calculateHash } from './hash/calculateHash.js';
import { archiveFile } from './zip/archiveFile.js';
import { 
    getUsernameFromArgs,
    getCurrentDirectory,
    currentDirectoryMessage,
    welcomeMessage,
    exitMessage,
} from "./helpers.js";

const run = () => {
    const username = getUsernameFromArgs();

    welcomeMessage(username);
    changeDirectory(homeDir);
    currentDirectoryMessage();

    process.stdin.on('data', async (data) => {
        const [command, ...args] = data.toString().trim().split(' ');
        const [path] = args;
        const flag = args.find(arg => arg.startsWith('--'));

        const switchCommand = async () => {
            switch (command) {
                case 'cd':
                    await changeDirectory(path);
                    break;
                case 'up':
                    await changeDirectoryUp();
                    break;
                case 'ls':
                    await printFilesList(getCurrentDirectory());
                    break;
                case 'cat':
                    await readFile(path);
                    break;
                case 'add':
                    await createEmptyFile(path);
                    break;
                case 'rn':
                    await renameFile(args);
                    break;
                case 'cp':
                    await copyFile(args);
                    break;
                case 'mv':
                    await moveFile(args);
                    break;
                case 'rm':
                    await removeFile(path);
                    break;
                case 'os':
                    await printOsInfo(flag);
                    break;
                case 'hash':
                    await calculateHash(path);
                    break;
                case 'compress':
                    await archiveFile(args, 'compress');
                    break;
                case 'decompress':
                    await archiveFile(args, 'decompress');
                    break;
                case '.exit':
                    exitMessage(username);
                    process.exit();
                default:
                    console.log('Invalid input');
                    break;
            }
        }

        await switchCommand();

        currentDirectoryMessage();
    });

    process.on('SIGINT', () => {
        exitMessage(username);
        process.exit();
    });
};

run();

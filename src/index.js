import process from 'node:process';
import { printOsInfo } from './os/os.js'
import { changeDirectory } from './cd/cd.js'
import { printFilesList } from './ls/ls.js'
import { changeDirectoryUp } from './up/up.js'
import { getUsernameFromArgs, getCurrentDirectory, currentDirectoryMessage, welcomeMessage, exitMessage } from "./helpers.js";

const run = () => {
    const username = getUsernameFromArgs();

    welcomeMessage(username);
    currentDirectoryMessage();

    process.stdin.on('data', async (data) => {
        const [command, argument] = data.toString().trim().split(' ');

        const switchCommand = async () => {
            switch (command) {
                case 'cd':
                    changeDirectory(argument);
                    break;
                case 'up':
                    changeDirectoryUp();
                    break;
                case 'ls':
                    await printFilesList(getCurrentDirectory());
                    break;
                case 'os':
                    printOsInfo(argument);
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

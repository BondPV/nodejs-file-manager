import { stdin } from 'node:process';
import { printOSInfo } from './os/os.js'
import { getUsernameFromArgs, currentDirectoryMessage, welcomeMessage, exitMessage } from "./helpers.js";

const run = () => {
    const username = getUsernameFromArgs();

    welcomeMessage(username);
    currentDirectoryMessage();

    stdin.on('data', (data) => {
        const [command, argument] = data.toString().trim().split(' ');

        switch (command) {
            case 'os':
                printOSInfo(argument);
                break;
            case '.exit':
                exitMessage(username);
                process.exit();
            default:
                console.log('Invalid input');
                break;
        }

        currentDirectoryMessage();
    });

    process.on('SIGINT', () => {
        exitMessage(username);
        process.exit();
    });
};

run();
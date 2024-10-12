import process, { stdin } from 'node:process'
import { getUsernameFromArgs, welcomeMessage, exitMessage } from "./helpers.js";

const run = () => {
    const username = getUsernameFromArgs();

    welcomeMessage(username);

    stdin.on('data', (data) => {
        const input = data.toString().trim().split(' ');
        
        switch (input[0]) {
            case '.exit':
            case 'exit':
                exitMessage(username);
                process.exit();
            default:
                console.log('Invalid input');
                break;
        }
    });

    process.on('SIGINT', () => {
        exitMessage(username);
        process.exit();
    });
};

run();
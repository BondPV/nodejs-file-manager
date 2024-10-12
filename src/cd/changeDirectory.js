import { chdir } from 'node:process';

export const changeDirectory = (path) => {
    try {
        chdir(path);
    } catch (e) {
        console.log(`Operation failed ${e.message}`);
    }
};

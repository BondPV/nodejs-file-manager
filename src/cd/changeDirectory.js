import { chdir } from 'node:process';

export const changeDirectory = async (path) => {
    try {
        chdir(path);
    } catch (e) {
        console.error(`Operation failed ${e.message}`);
    }
};

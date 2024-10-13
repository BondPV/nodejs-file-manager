import path from 'node:path';
import process from 'node:process';

export const changeDirectoryUp = async () => {
    try {
        const currentDir = process.cwd();
        const parentDir = path.resolve(currentDir, '..');
    
        if (currentDir === parentDir) {
            console.log('You are already in the root directory');
    
            return;
        }
    
        process.chdir(parentDir);
    } catch (e) {
        console.error(`Operation failed ${e.message}`);
    }
};

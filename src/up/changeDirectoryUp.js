import path from 'node:path';
import process from 'node:process';

export const changeDirectoryUp = () => {
    try {
        const currentDir = process.cwd();
        const parentDir = path.resolve(currentDir, '..');
    
        if (currentDir === parentDir) {
            console.log('You are already in the root directory');
    
            return;
        }
    
        process.chdir(parentDir);
    } catch (e) {
        console.log(`Operation failed ${e.message}`);
    }
};

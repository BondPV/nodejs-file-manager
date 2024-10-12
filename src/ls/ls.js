import { readdir } from 'node:fs/promises';

const sortFiles = (files) => {
    return files.sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) {
            return -1;
        }

        if (!a.isDirectory() && b.isDirectory()) {
            return 1;
        }

        return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
    });
};

export const printFilesList = async (dir) => {
    try {
        const files = await readdir(dir, { withFileTypes: true });
        const sortedFiles = sortFiles(files);
        const tableData = sortedFiles.map((file) => ({
            Name: file.name,
            Type: file.isDirectory() ? 'directory' : 'file'
        }));

        console.table(tableData);
    } catch (e) {
        console.log(`Operation failed ${e.message}`);
    }
};

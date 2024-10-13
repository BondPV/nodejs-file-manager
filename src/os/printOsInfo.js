import os from 'node:os';

export const homeDir = os.userInfo().homedir;

export const printOsInfo = async (argument) => {
    if (!argument) {
        console.error('Missing argument');
        return;
    }

    try {
        switch (argument) {
            case '--EOL':
                console.log(`EOL: ${JSON.stringify(os.EOL)}`);
                break;
            case '--cpus':
                const cpus = os.cpus();
                console.log(`Total CPUs: ${cpus.length}`);
                cpus.forEach((cpu, index) => {
                    console.log(`CPU ${index + 1}: Model - ${cpu.model}, Speed - ${(cpu.speed / 1000).toFixed(2)} GHz`);
                });
                break;
            case '--homedir':
                console.log(`Home Directory: ${homeDir}`);
                break;
            case '--username':
                const userInfo = os.userInfo();
                console.log(`Current Username: ${userInfo.username}`);
                break;
            case '--architecture':
                console.log(`CPU Architecture: ${os.arch()}`);
                break;
            default:
                console.error('Invalid OS command');
                break;
        }
    } catch (e) {
        console.error(`Operation failed ${e.message}`);
    }
};

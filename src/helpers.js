import process from 'node:process'

export const getUsernameFromArgs = () => {
    const usernameArg = process.argv.find(arg => arg.startsWith('--username='));

    return usernameArg ? usernameArg.split('=')[1] : 'User';
};

export const  welcomeMessage = (username) => {
    console.log(`Welcome to the File Manager, ${username}!`);
};

export const exitMessage = (username) => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
};

export const getCurrentDirectory = process.cwd;

export const currentDirectoryMessage = () => console.log(`You are currently in ${getCurrentDirectory()}`);

export const getCommandArguments = (data) => {
    const [command, ...args] = data.toString().trim().split(' ');
    const [path] = args;
    const flag = args.find(arg => arg.startsWith('--'));

    return { command, args, path, flag };
};

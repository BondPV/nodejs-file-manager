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

export const currentDirectoryMessage = () => console.log(`You are currently in ${process.cwd()}`)

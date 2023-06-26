import { argv } from 'node:process';
const parseArgs = () => {
    const commandLineArgs = argv.slice(2);
    let argsArray = [];
    commandLineArgs.forEach((item) => {
        if (item.startsWith('--')) {
            argsArray.push(`${item.slice(2)}`);
        }
    });
    return argsArray;
};
export default parseArgs;
import upDir from "./nwd/up.js";
import cd from "./nwd/cd.js";
import list from "./fs/list.js";
import readStream from "./streams/read.js";
import create from "./fs/create.js";
import rename from "./fs/rename.js";
import copyFile from "./streams/copy.js";
import moveFile from "./streams/mv.js";
import remove from "./fs/delete.js";
import osInfo from "./os/os.js";
import calculateHash from "./hash/calcHash.js";
const handleCommand = async (rlCommand) => {
    try {
        const regex = /[^\s"']+|"([^"]*)"/g; // find "fol der with spaces"
        const commandLine = rlCommand.trim(); 
        const args = commandLine.match(regex).map(arg => arg.replace(/(^"|"$)/g, '')); // delete ""
        switch (true) {
            case args[0] === 'up':
                upDir();
                break;
            case args[0] === 'cd':
                if(args.length === 2) cd(args[1])
                else throw new Error('Wrong data in arguments');
                break;
            case args[0] === 'ls':
                await list();
                break;
            case args[0] === 'cat':
                if(args.length === 2) await readStream(args[1])
                else throw new Error('Wrong data in arguments');
                break;
            case args[0] === 'add':
                if(args.length === 2) await create(args[1])
                else throw new Error('Wrong data in arguments');
                break;
            case args[0] === 'rn':
                if(args.length === 3) await rename(args[1], args[2])
                else throw new Error('Wrong data in arguments');
                break;
            case args[0] === 'cp':
                if(args.length === 3) await copyFile(args[1], args[2])
                else throw new Error('Wrong data in arguments');
                break;
            case args[0] === 'mv':
                if(args.length === 3) await moveFile(args[1], args[2])
                else throw new Error('Wrong data in arguments');
                break;
            case args[0] === 'rm':
                if(args.length === 2) await remove(args[1])
                else throw new Error('Wrong data in arguments');
                break;
            case args[0] === 'os':
                if(args.length === 2) await osInfo(args[1])
                else throw new Error('Wrong data in arguments');
                break;
            case args[0] === 'hash':
                if(args.length === 2) await calculateHash(args[1])
                else throw new Error('Wrong data in arguments');
                break;
            default:
                throw new Error('Unknown operation'); 
        }
    } catch (error) {
        console.log(error.message);
    }
};
export default handleCommand;
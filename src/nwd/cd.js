import { chdir } from 'node:process';
import { resolve } from 'node:path';
const cd = (path) => {
    try{
        if (path.match(/[A-Za-z]:$/)) {
            chdir(`${path[0]}:\\`);
        } else {
            const parentDirectory = resolve(process.cwd(), path);
            chdir(parentDirectory);
        }
    } catch (error) {
        throw new Error('Operation Failed'); 
    }
};
export default cd;
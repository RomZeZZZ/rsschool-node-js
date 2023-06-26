import { chdir } from 'node:process';
import { resolve } from 'node:path';
const upDir = () => {
    const parentDirectory = resolve(process.cwd(), '..');
    chdir(parentDirectory);
};
export default upDir;
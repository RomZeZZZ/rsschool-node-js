import { readdir } from 'fs/promises';
import { stat } from 'fs/promises';
import { resolve } from 'node:path';
const list = async () => {
    const files = await readdir(process.cwd());
    const fileData = await Promise.all(
        files.map(async (file) => {
        const stats = await stat(resolve(process.cwd(), file));
        const isDirectory = stats.isDirectory();
        return {
            Name: file,
            Type: isDirectory ? 'Directory' : 'File',
        };
        })
    );
    const sortedFileData = fileData.sort((a, b) => {
        if (a.Type === b.Type) {
        return a.Name.localeCompare(b.Name);
        }
        return a.Type === 'Directory' ? -1 : 1;
    });
    console.table(sortedFileData);
};
export default list;
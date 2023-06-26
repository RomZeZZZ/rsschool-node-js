import { unlink } from 'fs/promises';
import { resolve } from 'node:path';
const remove = async (pathToFile) => {
    const filePath = resolve(process.cwd(), pathToFile);
    try {
        await unlink(filePath)
        .catch(() => {
            throw new Error(`FS operation failed. Failed to delete ${filePath}`);
        });
    } catch (error) {
        console.log(error.message);
    }
};

export default remove;
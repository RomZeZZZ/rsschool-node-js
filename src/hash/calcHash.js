import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { resolve } from 'node:path';
const calculateHash = async (filePath) => {
    try {
        const workFilePath = resolve(process.cwd(), filePath);
        const fileData = await readFile(workFilePath)
            .then((data) => data)
            .catch(() => {
                throw new Error(`FS operation failed. Failed to read ${filePath}`);
            });
        const hash = createHash('sha256');
        hash.update(fileData);
        const hashHex = hash.digest('hex');
        console.log(`SHA256 Hash: ${hashHex}`);
    } catch (error) {
        console.log(error.message);
    }
};

export default calculateHash;
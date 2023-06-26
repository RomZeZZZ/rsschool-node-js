import { createReadStream } from 'fs';
import { resolve } from 'node:path';
import { pipeline as pipelineAsync } from 'stream/promises';
const readStream = async (pathFile) => {
    try {
        const readStream = createReadStream(resolve(process.cwd(), pathFile), 'utf8');
        await pipelineAsync(readStream, process.stdout, { end: false })
        .catch(() => {
            throw new Error('Operation failed. Failed to read file')
        });
        console.log();
    } catch (error) {
        throw new Error(error.message);
    }
};

export default readStream;

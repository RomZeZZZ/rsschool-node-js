import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { basename, extname } from 'node:path';
import { createBrotliDecompress } from 'zlib';
import { access, constants, stat } from 'fs/promises';
import { pipeline as pipelineAsync } from 'stream/promises';
const decompress = async (pathToFile, pathToDest) => {
    try {
        const initialPath = resolve(process.cwd(), pathToFile);
        const pathToDir = resolve(process.cwd(), pathToDest);
        let decompressedFilePath;
        const stats = await stat(pathToDir)
        .then((data) => { return data.isDirectory() })
        .catch(() => { return false });
        const isfileExist = await access(initialPath, constants.F_OK)
        .then(() => { return true })
        .catch(() => { return false });
        if (stats && isfileExist) {
            const isDirectoryExist = await access(pathToDir, constants.F_OK)
            .then(() => { return true })
            .catch(() => { return false });
            if (isDirectoryExist) {
                decompressedFilePath = resolve(pathToDir, basename(initialPath, extname(initialPath)) + '.txt');
            }
        } else {
            decompressedFilePath = pathToDir;
        }
        if (isfileExist) {
            const readStream = createReadStream(initialPath);
            const writeStream = createWriteStream(decompressedFilePath);
            const decompressStream = createBrotliDecompress();
            await pipelineAsync(readStream, decompressStream, writeStream);
        } else {
            throw new Error('Compress file missing or wrong dest path');
        }
    } catch (error) {
        console.log(error.message)
    }
};

export default decompress;
import { createReadStream, createWriteStream } from 'fs';
import { resolve } from 'path';
import { basename, extname } from 'node:path';
import { access, constants } from 'fs/promises';
import { pipeline as pipelineAsync } from 'stream/promises';
import { createBrotliCompress } from 'zlib';
const compress = async (pathToFile, pathToDest) => {
    try {
        const initialPath = resolve(process.cwd(), pathToFile);
        const pathToDir = resolve(process.cwd(), pathToDest);
        let newFilePath;
        const compressFileName = basename(initialPath, extname(initialPath)) + '.br';
        if (pathToDir.slice(-3) === '.br') {
            newFilePath = pathToDir;
        } else {
            newFilePath = resolve(pathToDir, compressFileName);
        }
        const isfileExist = await access(initialPath, constants.F_OK)
        .then(() => { return true })
        .catch(() => { return false });
        const isNewFileExist = await access(newFilePath, constants.F_OK)
        .then(() => { return true })
        .catch(() => { return false });
        if (isfileExist && !isNewFileExist) {
            const readStream = createReadStream(initialPath);
            const writeStream = createWriteStream(newFilePath);
            const compressStream = createBrotliCompress();
            await pipelineAsync(readStream, compressStream, writeStream);
        } else if (!isfileExist){
            throw new Error(`Operation failed. Initial file doesnt exist.`);
        } else {
            throw new Error('Operation failed. Compressed file already exist.');
        }
    } catch (error) {
        console.log(error.message);
    }
    
}
export default compress;
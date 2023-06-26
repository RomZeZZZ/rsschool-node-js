import { createReadStream, createWriteStream } from 'fs';
import { resolve, basename } from 'node:path';
import { access, constants, unlink } from 'fs/promises';
import { stat } from 'fs/promises';
import { pipeline as pipelineAsync } from 'stream/promises';
const moveFile = async (pathFile, pathToNewDir) => {
    const pathToFile = resolve(process.cwd(), pathFile);
    const pathToDir = resolve(process.cwd(), pathToNewDir);
    const fileName = basename(pathToFile);
    try {
        const fileExists = await access(resolve(pathToDir, fileName), constants.F_OK)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
        const statsDir = await stat(pathToDir)
        .catch(() => {
            throw new Error('Operation failed. wrong path to directory')
        });
        const statsFile = await stat(pathToFile)
        .catch(() => {
            throw new Error('Operation failed. fail to read file or wrong path')
        });
        if (!statsDir.isDirectory()) {
            throw new Error('Operation failed. second arg is not directory')
        } else if (!statsFile.isFile()) {
            throw new Error('Operation failed. first arg is not file')
        }
        if (!fileExists) {
            const readStream = createReadStream(pathToFile, 'utf8');
            const writeStream = createWriteStream(resolve(pathToDir, fileName));
            await pipelineAsync(readStream, writeStream)
            .then(async () => {
                await unlink(pathToFile)
                .catch(() => {
                    throw new Error('Operation failed. Failed to delete initial file');
                });
            }) 
            .catch(() => {
                throw new Error('Operation failed. Failed to copy file');
            });
        } else {
            throw new Error('Operation failed. File already exist');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

export default moveFile;
import { createReadStream, createWriteStream } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { access, constants } from 'fs/promises';
import zlib from 'zlib';
const compress = async () => {
    try {
        const rootPath = dirname(fileURLToPath(import.meta.url));
        const filePath = resolve(join(rootPath, 'files', 'fileToCompress.txt'));
        const compressedFilePath = resolve(join(rootPath, 'files', 'archive.gz'));
        const fileExist = await access(filePath, constants.F_OK)
        .then(() => { return true })
        .catch(() => { return false });
        if (fileExist) {
            const readStream = createReadStream(filePath);
            const writeStream = createWriteStream(compressedFilePath);
            const gzip = zlib.createGzip();
            readStream.pipe(gzip).pipe(writeStream);
            writeStream.on('finish', () => {
              console.log('File compression completed.');
            });
        } else {
            throw new Error('Compressing file missing.');
        }
    } catch (error) {
        console.log(error.message)
    }
    
}
await compress();
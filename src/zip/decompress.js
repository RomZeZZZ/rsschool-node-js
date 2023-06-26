import { createReadStream, createWriteStream } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';
import { access, constants } from 'fs/promises';
const decompress = async () => {
  try {
    const rootPath = dirname(fileURLToPath(import.meta.url));
    const compressedFilePath = resolve(join(rootPath, 'files', 'archive.gz'));
    const compressFileExist = await access(compressedFilePath, constants.F_OK)
    .then(() => { return true })
    .catch(() => { return false });
    if (compressFileExist) {
      const decompressedFilePath = resolve(join(rootPath, 'files', 'fileToCompress.txt'));
      const readStream = createReadStream(compressedFilePath);
      const writeStream = createWriteStream(decompressedFilePath);
      const gunzip = zlib.createGunzip();
      readStream.pipe(gunzip).pipe(writeStream);
      writeStream.on('finish', () => {
        console.log('File decompression completed.');
      });
    } else {
      throw new Error('Compress file missing.');
    }
  } catch (error) {
    console.log(error.message)
  }
};

await decompress();
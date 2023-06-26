import { appendFile, access, constants } from 'fs/promises';
import { resolve } from 'node:path';
const create = async (fileName) => {
  try {
    const filePath = resolve(process.cwd(), fileName);
    const fileExists = await access(filePath, constants.F_OK)
    .then(() => {
      return true;
    })
    .catch(() => {
      appendFile(filePath, '')
      .catch(() => {
        throw new Error('Operation failed. Failed to create file');
      });
      return false;
    });
    if (fileExists) {
      throw new Error('Operation failed. File already exists.');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export default create;
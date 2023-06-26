import { access, constants, rename as reName } from 'fs/promises';
import { resolve } from 'node:path';
import { join, parse } from 'path';
const rename = async (pathToFile, newFileName) => {
    const filePath = resolve(process.cwd(), pathToFile);
    const { dir } = parse(filePath);
    const newFilePath = join(dir, newFileName);
    try {
        const isWrongFileExist = await access(filePath, constants.F_OK)
        .then(() => { return true })
        .catch(() => { return false });
        const isNewFileExist = await access(newFilePath, constants.F_OK)
        .then(() => { return true })
        .catch(() => { return false });
        if (isWrongFileExist && !isNewFileExist) {
            await reName(filePath, newFilePath);
        } else if (isNewFileExist){
            throw new Error(`Operation failed. ${newFileName} is already exist.`);
        } else {
            throw new Error('Operation failed. File to rename doesnt exist.');
        }
    } catch (error) {
        console.log(error.message);
    }
};

export default rename;
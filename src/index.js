import * as readlinePromises from 'node:readline/promises';
import { stdin as input, stdout as output, stdout } from 'node:process';
import username from './cli/args.js';
import handleCommand from './handleCommand.js';
import showCurrentDir from './nwd/showCurrentDir.js';
import os from 'os';
import cd from './nwd/cd.js';
cd(os.homedir());
const rl = readlinePromises.createInterface({ input, output });
let user = '';
const userData = username()[0] ? username()[0].split('=') : null;
if (username().length === 1 && userData[0] === 'username' && userData[1].trim() !== '') {
    user = userData[1];
} else { 
    user = 'Stranger';
}
console.log(`Welcome to the File Manager, ${user}!`);
showCurrentDir();
rl.on('line', async (input) => {
    if (input === '.exit') rl.close();
    await handleCommand(input);
    showCurrentDir();
});
rl.on('close', () => {
  console.log(); 
  console.log(`Thank you for using File Manager, ${user}, goodbye!`)
  process.exit();
});
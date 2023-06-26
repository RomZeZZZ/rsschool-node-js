import os from 'os';
const osInfo = async (osArgs) => {
    try {
        const commandOs = osArgs; 
        switch (true) {
            case commandOs === '--EOL':
                const eol = os.EOL;
                console.log(`End-Of-Line (EOL): ${JSON.stringify(eol)}`);
                break;
            case commandOs === '--cpus':
                const cpus = os.cpus();
                console.log('CPUs Info:');
                cpus.forEach((cpu, index) => {
                    const { model, speed } = cpu;
                    console.log(`CPU ${index + 1}: Model - ${model}, Speed - ${speed / 1000} GHz`);
                });
                console.log(`Total CPUs: ${cpus.length}`);
                break;
            case commandOs === '--homedir':
                const homeDir = os.homedir();
                console.log(`Home Directory: ${homeDir}`);
                break;
            case commandOs === '--username':
                const userName = os.userInfo().username;
                console.log(`Current User Name: ${userName}`);
                break;
            case commandOs === '--architecture':
                const architecture = process.arch;
                console.log(`CPU Architecture: ${architecture}`);
                break;
            default:
                throw new Error('Unknown os parametr'); 
        }
    } catch (error) {
        console.log(error.message);
    }
};
export default osInfo;

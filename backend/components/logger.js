const figlet = require('figlet');
const chalk  = require('chalk');

module.exports = {
    log() {
        let shouldLog = (global.argv.log === 'true');
        if(!shouldLog)
            return;
        for(let arg of arguments){
            arg.date = new Date();
            console.log(arg);
        }
    },
    startMsg() {
        console.log(chalk.bold(chalk.green(chalk.bgBlack(figlet.textSync('Gratis')))));
        let link = chalk.bold(chalk.blue(`http://localhost:${global.argv.port}`));
        console.log(`Magic happens at 🔗 ${link}`);
    }
}
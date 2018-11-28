module.exports = {
    log() {
        let shouldLog = (global.argv.log === 'true');
        if(!shouldLog)
            return;
        for(let arg of arguments){
            arg.date = new Date();
            console.log(arg);
        }
    }
}
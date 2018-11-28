module.exports = {
    log() {
        let shouldLog = (global.argv.log === 'true');
        if(!shouldLog)
            return;
        console.log(arguments);
    }
}
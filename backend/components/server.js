const http              = require('http');
const requestHandler    = require('./requestHandler');
const logger            = require('./logger');

const port = global.argv.port || 8080;

module.exports = {
    start() {
        http
        .createServer( (req, res) => {
            requestHandler(req, res);
         })
        .listen(port, err => {
            if(err){
                logger.log({serverStarted:false, error:err});
                return;
            }
            logger.log({serverStarted:true, port});
        }); 
    }
}
const http = require('http');
const requestHandler = require('./requestHandler');

const port = global.argv.port || 8080;

module.exports = {
    start() {
        http
        .createServer( (req, res) => {
            requestHandler(req, res);
         })
        .listen(port, err => {
            if(err){
                console.log('There was an error starting the server', err);
            }
            console.log(`server is running on port: ${port}`);
        }); 
    }
}
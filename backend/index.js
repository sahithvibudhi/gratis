const server = require('./components/server');
global.CONST = require('./components/constants');

const db = require('./components/db');
db.getConnection().then((result)=>{
    global.dbConnection = result;
});

module.exports = {
    serve() {
        server.start();
    }
}
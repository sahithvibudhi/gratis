const server        = require('./components/server');
const db            = require('./components/db');
const logger        = require('./components/logger');

global.CONST        = require('./components/constants');
global.mongoObjId   = require('mongodb').ObjectID;

db.getConnection().then((result)=>{
    global.dbConnection = result;
    logger.log({databaseConnection:true, result});
}, (rejected)=>{
    logger.log({databaseConnection:false, error:rejected});
});

module.exports = {
    serve() {
        server.start();
    }
}
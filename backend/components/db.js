var MongoClient = require('mongodb').MongoClient;
var url = global.argv.dburl || "mongodb://localhost:27017/";

module.exports = {

    async getConnection() {
        return await MongoClient.connect(url);
    },

    getCollection(req) {
        // TODO: error handling
        var burstedURL = req.pathname.split('/');
        var dbName = burstedURL[1];
        var collectionName = burstedURL[2];
        return global.dbConnection.db(dbName).collection(collectionName);
    },

    getSortQuery(param) {
        if(!param)
            return {};
        param = param.trim();
        var sign    = param.charAt(0);
        var query   = {};
        switch(sign) {
            case '-' :
                query[param.substring(1)] = -1;
            break;
            default:
                query[param] = 1;
            break;
        }
        console.log(param, query, sign);
        return query;
    },

    getQuery(req) {
        var criteria = {}
        criteria.query = req.query;
        criteria.query.author_id = req.headers['gratis-identifier'];
        criteria.sort = this.getSortQuery(req.query.sort);
        delete req.query.sort;
        req.query.limit = parseInt(req.query.limit);
        criteria.limit = req.query.limit > 20 ? 20 : req.query.limit;
        delete req.query.limit;
        return criteria;
    }

}
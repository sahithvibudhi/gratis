const output    = require('./output');
const db        = require('./db');
 
module.exports = async (req, res) => {

    switch(req.method) {
        case global.CONST.RTYPE.GET:
            await CRUD.read(req, res);
        break;
        case global.CONST.RTYPE.POST:
            await CRUD.create(req, res);
        break;
        case global.CONST.RTYPE.PUT:
            await CRUD.update(req, res);
        break;
        case global.CONST.RTYPE.DEL:
            await CRUD.delete(req, res);
        break;
        default:
            // TODO: handle the method not implemented and logger
        break;
    }

}

CRUD = {

    create  : async (req, res) => {
        var row         = req.body;
        row.created_at  = new Date();
        row.author_id   = req.headers['gratis-identifier'];
        var result      = await db.getCollection(req).insertOne(row);
        output(res, result);
    },

    read    : async (req, res) => {
        var criteria    = db.getQuery(req);
        var results     = await db.getCollection(req).find(criteria.query).sort(criteria.sort).limit(criteria.limit).toArray();
        output(res, results);
    },
    
    update  : async (req, res) => {
        var criteria    = db.getQuery(req);
        var row         = req.body;
        row.created_at  = new Date();
        row.author_id   = req.headers['gratis-identifier'];
        row             = { "$set" : row };
        var results     = await db.getCollection(req).updateMany(criteria.query, row, true);
        output(res, results);
    },
    
    delete  : async (req, res) => {
        var criteria    = db.getQuery(req);
        var results     = await db.getCollection(req).deleteMany(criteria.query);
        output(res, results);
    }

}
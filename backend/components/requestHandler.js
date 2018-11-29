const qs            = require('querystring');
const { jsonify }   = require('./input');
const CRUD          = require('./CRUD');
const beforeRequest = require('./../hooks/beforeReq');
const afterRequest  = require('./../hooks/afterReq');

module.exports = async (req, res) => {
    jsonify(req, res, handle)
}

async function handle(req, res) {
    beforeRequest(req, res);
    await CRUD(req, res);
    afterRequest(req, res);
    res.end();
}

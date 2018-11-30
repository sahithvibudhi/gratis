const qs                = require('querystring');
const { jsonify }       = require('./input');
const CRUD              = require('./CRUD');
const beforeRequest     = require('./../hooks/beforeReq');
const afterRequest      = require('./../hooks/afterReq');
const { gratisHandler } = require('./gratisDefaults');

module.exports = async (req, res) => {
    jsonify(req, res, handle)
}

async function handle(req, res) {
    // if the route is reserved
    if (req.pathname.startsWith('/gratis')) {
        await gratisHandler(req, res);
    }
    // else just perform a CRUD
    else {
        beforeRequest(req, res);
        await CRUD(req, res);
        afterRequest(req, res);
    }
    res.end();
}

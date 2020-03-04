const qs                = require('querystring');
const { jsonify }       = require('./input');
const CRUD              = require('./CRUD');
const beforeRequest     = require('./../hooks/beforeReq');
const afterRequest      = require('./../hooks/afterReq');
const { gratisHandler } = require('./gratisDefaults');
const headers           = require('./../components/headers');

module.exports = async (req, res) => {
    jsonify(req, res, handle)
}

/**
 * Handles all the requests
 * @param req HTTPRequest
 * @param res HTTPResponse
 */
async function handle(req, res) {
    if(req.method == 'OPTIONS') {
        headers.setCORS(req, res);
    }
    // route /gratis is reserved by gratis. shall be used to load dashboard/gratis dashboard APIs
    else if (req.pathname.startsWith('/gratis')) {
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

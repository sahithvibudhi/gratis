const qs            = require('querystring');
const { jsonify }   = require('./input');
const CRUD          = require('./CRUD');

module.exports = async (req, res) => {
    jsonify(req, res, handle)
}

async function handle(req, res) {
    await CRUD(req, res);
    res.end();
}

const headers = require('./../components/headers');

module.exports = (req, res) => {
    headers.setCORS(req, res);
}
const headers = require('./../components/headers');

module.exports = (req, res) => {
    headers.setDefaultContentType(req, res);
}
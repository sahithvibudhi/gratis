const headers                   = require('./../components/headers');
const { isValidRESTRequest }    = require('./../components/auth');

module.exports = (req, res) => {

    headers.setDefaultContentType(req, res);
    headers.setCORS(req, res);
    isValidRESTRequest(req, res);

}
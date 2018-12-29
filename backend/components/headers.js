module.exports = {

    setDefaultContentType   : (req, res) => {
        res.setHeader('Content-type', 'application/json');
    },

    setStatus               : (req, res, status) => {
        res.writeHead(status);
    },

    setCORS                 : (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization, gratis-identifier, gratis-secret');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    }

}
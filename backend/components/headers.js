module.exports = {

    setDefaultContentType   : (req, res) => {
        res.setHeader('Content-type', 'application/json');
    },

    setStatus               : (req, res, status) => {
        res.writeHead(status);
    }

}
const url = require('url');
const qs  = require('querystring');

module.exports = {

    jsonify(req, res, handle) {
        var body = '';
        req.on('data', function (data) {
            body += data;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (req.length > 1e6) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                request.connection.destroy();
            }
        });
        req.on('end', function () {
            req.body = undefined;
            if(req.headers['content-type'] === global.CONST.CTYPE.FORM_URLENCODED)
                req.body = qs.parse(body);
            if(req.headers['content-type'] === global.CONST.CTYPE.JSON)
                req.body = JSON.parse(body);
            var url_parts = url.parse(req.url, true);
            req.pathname = url_parts.pathname;
            req.query = url_parts.query;
            handle(req, res);
        });
    }
    
}
const url       = require('url');
const qs        = require('querystring');
const logger    = require('./logger');

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
            req.body = [];
            if(req.headers['content-type'])
            {
                if(req.headers['content-type'].startsWith(global.CONST.CTYPE.FORM_URLENCODED))
                    req.body = qs.parse(body);
                if(req.headers['content-type'].startsWith(global.CONST.CTYPE.JSON))
                    req.body = JSON.parse(body);
            }
            var url_parts = url.parse(req.url, true);
            req.pathname = url_parts.pathname;
            req.query = url_parts.query;
            logger.log({
                        requestType     : req.headers['content-type'], 
                        queryInUrl    : req.query, 
                        requestBody    : req.body,
                        requestPath    : req.pathname
                    });
            handle(req, res);
        });
    }
    
}
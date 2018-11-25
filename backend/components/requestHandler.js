const qs = require('querystring');

const RTYPE = {
    GET     : 'GET',
    POST    : 'POST',
    PUT     : 'PUT',
    DEL     : 'DELETE'
}

const CTYPE = {
    FORM_URLENCODED : 'application/x-www-form-urlencoded',
    JSON            : 'application/json',
}

module.exports = async (req, res) => {
    if(req.method != RTYPE.GET) {
        var data = getInputData(req);
        console.log(data);
    }
    console.log(req.url, req.method);
    res.end();
}

function handle() {

}

function getInputData(request) {
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                request.connection.destroy();
            }
        });
        request.on('end', function () {
            if(request.headers['content-type'] === CTYPE.FORM_URLENCODED)
                var POST = qs.parse(body);
            if(request.headers['content-type'] === CTYPE.JSON)
                var POST = JSON.parse(body);
            return POST;
        });
    }
}
const CRUD = require('./CRUD');

module.exports = {
    /**
     * handles the gratis functionality. Like creating a new app etc
     * @param req HTTPRequest
     * @param res HTTPResponse
     */
    gratisHandler : async (req, res) => {
        var burstedURL      = req.pathname.split('/');
        if(burstedURL.length < 3)
            return;
        var reservedWord    = burstedURL[1];
        var action          = burstedURL[2];
        switch (action) {
            case 'app':
                await app(req, res);
            break;
        }
    }
}

/**
 * handles CRUD of gratis app
 * @param req HTTPRequest
 * @param res HTTPResponse 
 */
const app = async (req, res) => {
    await CRUD(req ,res);
}
const CRUD      = require('./CRUD');
const { log }   = require('./logger');
const request   = require('request');

const github_client_token   = global.argv.github_client_token;
const github_secret_token   = global.argv.github_secret_token;
const host                  = global.argv.host;
const secret                = global.argv.gratis_secret;

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
        if(action === 'login') {
            // if contains code from github
            if (req.query.code) {
                log({
                    status: 'received redirect from github'
                });
                var resp = await asyncRequest(req);
                log(resp);
                return;
            }
            log({
                status: 'login request from the user'
            });
            res.writeHead(302, {
                'Location'  : `https://github.com/login/oauth/authorize?client_id=${github_client_token}&redirect_uri=${host}/gratis/login&state=${secret}`
            });
            return;
        }
        /**
         * check if the user is logged in
         */
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
const app          = async (req, res) => {
    await CRUD(req ,res);
}

const asyncRequest = async (req) => {
    return new Promise( (resolve, reject) => {
        request.post(
            'https://github.com/login/oauth/access_token',
            { json: { code: req.query.code, state: secret, client_id: github_client_token, client_secret: github_secret_token, redirect_url: `${host}/gratis/login` } },
            (err, resp, body) => {
                resolve({err, body});
            }
        );
    });
}
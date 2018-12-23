const CRUD                  = require('./CRUD');
const { log }               = require('./logger');
const request               = require('request');
const output                = require('./output');
const { isGratisLoggedIn }  = require('./auth');
const { MSGS }              = require('./constants');
const headers               = require('./headers');
const db                    = require('./db');


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
                var resp = await asyncLogin(req);
                log({gitHubResp:resp});
                if(resp.err) {
                    output(res, resp.err);
                } else {
                    // fetch user details
                    var userData   = await asyncFetchUserDetails(resp.body.access_token);
                    userData       = JSON.parse(userData.body);
                    userData.token = resp.body.access_token; 
                    // check if exists
                    var updated  = await db.getCollection({details: '/gratis/users'}).update({ id : userData.id}, userData, {upsert:true});
                    // update details
                    var dashboardURL = `${global.argv.gratis_dashboard_url}/storeToken/${resp.body.access_token}`;
                    log({status: 'redirect', url: dashboardURL});
                    // resp.dashboardURL = dashboardURL;
                    // output(res, resp.body);
                    res.writeHead(302, {
                        'Location': dashboardURL
                        //add other headers here...
                    });
                }
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
        headers.setDefaultContentType(req, res);
        if(!isGratisLoggedIn(req, res)){
            headers.setStatus(req, res, 500);
            output(res, MSGS.NO_AUTH);
            return;
        }
        switch (action) {
            case 'apps':
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

const asyncLogin = async (req) => {
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

const asyncFetchUserDetails = async (access_token) => {
    return new Promise( (resolve, reject) => {
        request.get({
            url     : `https://api.github.com/user?access_token=${access_token}`,
            headers : {
                'User-Agent'        : 'gratis'
            }
        },
        (err, resp, body) => {
            log({err, resp, body});
            resolve({err, body});
        }
        );
    });
}
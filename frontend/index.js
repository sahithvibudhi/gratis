// const finalhandler  = require('finalhandler');
// const serveStatic   = require('serve-static');
const { log }       = require('./../backend/components/logger');
const fs            = require('fs');
const path          = require('path');
const staticFolder  = 'build';
// const serve = serveStatic('./');

module.exports = {
    serve() {
        log({frontend:'starting..'});
    },
    staticHandler(req, res) {
        if (!global.argv.dashboard) {
            log({status:'dashboard disabled'});
            return;
        }
        // var done = finalhandler(req, res);
        // serve(req, res, done);
        var url = req.url.substring(10);
        var filePath = path.join(__dirname, staticFolder);
        filePath     = path.join(filePath, url);
        if (url.length == 0)
            filePath = path.join(filePath, 'index.html');
        log({filePath});
        var extname = path.extname(filePath);
        var contentType = 'text/html';
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;      
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.wav':
                contentType = 'audio/wav';
                break;
        }

        try {
            var content = fs.readFileSync(filePath); 
            res.write(content, 'utf-8');
        }
        catch(e) {
            if(e.code === 'ENOENT') {
                res.writeHead(400, {'Content-Type':contentType});
                res.write('<h1>File Not Found</h1>');
            }
            log({Exception: e, when: 'while serving a static file', filePath})
        }
        // {
        //     if (error) {
        //         if(error.code == 'ENOENT'){
        //             res.writeHead(200, { 'Content-Type': contentType });
        //             res.write('404');
        //         }
        //         else {
        //             res.writeHead(500);
        //             res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
        //             res.end(); 
        //         }
        //     }
        //     else {
        //         res.writeHead(200, { 'Content-Type': contentType });
        //         log({content});
        //         res.write(content);
        //     }
        // });
    }
}
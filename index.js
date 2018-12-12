const cmdArgs     = require('minimist')(process.argv.slice(2));
const envArgs     = require('dotenv').load().parsed;
const { log }     = require('./backend/components/logger');

global.argv       = Object.assign(envArgs, cmdArgs);
log(argv);

const backend     = require('./backend/index');
const frontend    = require('./frontend/index');

backend.serve();
frontend.serve();
global.argv = require('minimist')(process.argv.slice(2));

const backend = require('./backend/index');

backend.serve();
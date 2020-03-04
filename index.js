#! /usr/bin/env node
// loading arguments from the arguments
const cmdArgs     = require('minimist')(process.argv.slice(2));
// loading arguments from the .env file, if .env file is not present, load from process.env
const envArgs     = require('dotenv').load().parsed || process.env;
const { log }     = require('./backend/components/logger');

// merge both env variables, variable from env file is over-written if passed from the command line
global.argv       = Object.assign(envArgs, cmdArgs);
log(argv);

const backend     = require('./backend/index');

backend.serve();
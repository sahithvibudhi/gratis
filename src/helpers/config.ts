import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';

dotenv.config()

const optionDefinitions = [
    { name: 'port', alias: 'p', type: Number },
    { name: 'dbUrl', type: String },
];
const options = commandLineArgs(optionDefinitions);

const config = {
    PORT: options.port || process.env.PORT || 8000,
    PRODUCTION: process.env.NODE_ENV == 'production',
    DB_URL: options.dbUrl || process.env.DB_URL || 'mongodb://localhost:27017'
};

export default config;
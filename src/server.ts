import path from 'path';

import express from 'express';

import config from './helpers/config';
import logger from './helpers/logger';
import * as HomeController from './controllers/home'

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views/pages'));

// register static content
const staticCacheExpiry = 31557600000;
app.use('/css/tailwind', express.static(path.join(__dirname, '../node_modules/tailwindcss/dist'), {
    maxAge: staticCacheExpiry
}));
app.use('/fonts/quicksand', express.static(path.join(__dirname, '../node_modules/@fontsource/quicksand/files'), {
    maxAge: staticCacheExpiry
}));

app.get('/', HomeController.index);

// @TODO: Authentication
// @TODO: APIs
// @TODO: Forms

export const start = () => {
    app.listen(config.PORT, () => {
        logger.info(`server started 🚀`);
    });
}

export default app;

import path from 'path';

import express from 'express';
import session from 'express-session';
import mongoStore from 'connect-mongo';

import config from './helpers/config';
import logger from './helpers/logger';
import * as HomeController from './controllers/home'
import * as AuthController from './controllers/auth'
import MongoStore from 'connect-mongo';

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    // @TODO: read and assign secret from envs
    secret: '',
    store: MongoStore.create({ mongoUrl: config.DB_URL }),
}));


app.get('/', HomeController.index); 

app.get('/login', AuthController.loginForm);
app.post('/login', AuthController.login);
app.get('/logout', AuthController.logout);

// @TODO: Authentication
// @TODO: APIs
// @TODO: Forms

export const start = () => {
    app.listen(config.PORT, () => {
        logger.info(`server started 🚀`);
    });
}

export default app;

import path from 'path';

import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import config from './helpers/config';
import logger from './helpers/logger';
import * as HomeController from './controllers/home';
import * as AuthController from './controllers/auth';
import * as Middleware from './helpers/middleware';
import * as LandingController from './controllers/landing';

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

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    // @TODO: read and assign secret from envs
    secret: 'sdf',
    store: MongoStore.create({ mongoUrl: config.DB_URL }),
}));

//auth middleware
app.use('/auth/*', Middleware.shouldNotBeLoggedIn);
app.use('/admin/*', Middleware.shouldBeLoggedIn);

// landing page
app.get('/', LandingController.index);

// Auth endpoints
app.get('/auth/login', Middleware.shouldNotBeLoggedIn, AuthController.loginForm);
app.post('/auth/login', Middleware.shouldNotBeLoggedIn, AuthController.login);
app.get('/admin/logout', Middleware.shouldBeLoggedIn, AuthController.logout);

// admin dashboard
app.get('/admin/dashboard', Middleware.shouldBeLoggedIn, HomeController.index);
// @TODO: APIs
// @TODO: Forms

export const start = () => {
    app.listen(config.PORT, () => {
        logger.info(`server started 🚀`);
    });
}

export default app;

import { Request, Response, NextFunction } from 'express';

import { APIsCollection, settingsCollection } from '../helpers/db';

export const shouldBeLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.username) {
        return res.redirect('/auth/login');
    }
    return next();
}

export const shouldNotBeLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (req.session?.username) {
        return res.redirect('/admin/dashboard');
    }
    return next();
}

export const hasValidToken = async (req: Request, res: Response, next: NextFunction) => {
    const route = req.path;
    const { authorization } = req.headers;
    const key = authorization?.replace('Bearer ', '')
    const path = route.replace('/api', '');
    const settings = await settingsCollection.findOne({
        key
    });
    const api = await APIsCollection.findOne({
        path
    });
    console.log(api, settings?.apis);
    if (!settings?.apis?.includes(api?._id.toString())) {
        return res.status(401).json({
            msg: 'this API is protected. needs a valid token to access.'
        });
    }
    return next();
}
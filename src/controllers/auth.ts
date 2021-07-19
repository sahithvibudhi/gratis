import { Request, Response } from 'express';

import config from '../helpers/config';

export const loginForm = (req: Request, res: Response) => {
    return res.render('auth/login');
}

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username !== config.ADMIN_USERNAME || password != config.ADMIN_PASSWORD) {
        return res.redirect('/login?error');
    }
    req.session.username = username;
    return res.redirect('/dashboard');
}

export const logout = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (!err) {
            return res.redirect('/');
        } else {
            return res.render('errors/500');
        }
    });
}

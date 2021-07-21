import { Request, Response, NextFunction } from 'express';

export const shouldBeLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if (!req.session?.username) {
        return res.redirect('/auth/login');
    }
    return next();
}

export const shouldNotBeLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    if (req.session?.username) {
        return res.redirect('/admin/dashboard');
    }
    return next();
}
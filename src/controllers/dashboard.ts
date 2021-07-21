import { Request, Response } from 'express';

export const index = (req: Request, res: Response) => {
    res.render('dashboard/index');
}

export const settings = (req: Request, res: Response) => {
    res.render('dashboard/settings');
}
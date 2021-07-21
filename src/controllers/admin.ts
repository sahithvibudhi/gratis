import {v4 as uuidv4} from 'uuid';
import { Request, Response } from 'express';

import { APIsCollection, settingsCollection } from '../helpers/db';
import logger from '../helpers/logger'
//@TODO: add schemas as validators
export const saveAPI = async (req: Request, res: Response) => {
    const body: APICollection = req.body;
    const record = body;
    const result = await APIsCollection.insertOne(record);
    // @TODO: check result.insertedId and result.acknowledged
    return res.redirect('/admin/dashboard');
}


//@TODO: add schemas as validators
export const saveKeys = async (req: Request, res: Response) => {
    const body: KeyCollection = req.body;
    const record = body;
    record.key = uuidv4();
    if (!Array.isArray(record.apis)) {
        record.apis = [record.apis];
    }
    const result = await settingsCollection.insertOne(record);
    // @TODO: check result.insertedId and result.acknowledged
    return res.redirect('/admin/settings');
}
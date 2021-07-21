import { MongoClient, Db, Collection } from 'mongodb';

import config from './config';

export let gratisDB: Db;
export let APIsCollection: Collection;
export let settingsCollection: Collection;

const setupConnection = async () => {
    const mongoClient = new MongoClient(config.DB_URL);
    await mongoClient.connect();
    gratisDB = mongoClient.db(config.DB_NAME);
    APIsCollection = gratisDB.collection('apis');
    settingsCollection = gratisDB.collection('settings');
}

export default setupConnection;
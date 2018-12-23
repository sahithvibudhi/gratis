const db        = require('./db');
const { log }   = require('./logger');

module.exports = {

    isGratisLoggedIn : async (req, res) => {
        if(req.headers.authorization){
            var token = req.headers.Authorization;
            var count = await db.getCollection({details:'/gratis/users'}).count({token});
            return count > 0;
        }
        return false;
    },

    isValidRESTRequest : (req, res) => {
        return true;
    }   

}
const db        = require('./db');
const { log }   = require('./logger');

module.exports = {

    isGratisLoggedIn : async (req, res) => {
        if(req.headers.authorization){
            var token = req.headers.authorization;
            var data = await db.getCollection({details:'/gratis/users'}).findOne({token});
            // data found with the given token
            if(data) {
                req.userData = data;
                return true;
            }
        }
        return false;
    },

    isValidRESTRequest : (req, res) => {
        return true;
    }   

}
const randomString = require('randomstring');

module.exports = {

    gratisIdentifier : (req) => {
        return req.userData.login + '-' + randomString.generate({
            length: 12,
            charset: 'alphabetic'
          });
    },

    gratisSecret : () => {
        return randomString.generate();
    }

}
const path = require('path');
const {google} = require('googleapis');


/*
 * Gets the auth for accessing Google
 * @param {String} user the user's email address to impersonate
 */ 
const getAuth = async (user) => {
    const jwtClient = new google.auth.GoogleAuth({
        keyFile: path.join(__dirname ,'.','privatekey.json'),
        scopes: [
            "https://www.googleapis.com/auth/cloud-platform"
        ],
        clientOptions: {
            subject: user
        },
      });

    return jwtClient  
    
}

module.exports = { getAuth }
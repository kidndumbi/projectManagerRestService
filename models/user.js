const {db} = require('../dbConnect.js');


var user = db.model('users', {

    userName: {
        type: String
    },

    password: {
        type: String
    },

    email: {
        type: String
    }

});

module.exports = {user};


const {db} = require('../dbConnect.js');


var user = db.model('users', {

    password: {
        type: String
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }

});

module.exports = {user};


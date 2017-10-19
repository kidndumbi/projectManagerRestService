const {db} = require('../dbConnect.js');
var validator = require('validator');


var user = db.model('users', {

    password: {
        type: String
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: '{VALUE} is not a valid email'
        }
    }

});

module.exports = {user};


const {db} = require('../dbConnect.js');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const Schema = db.Schema;

const UserSchema = new Schema(
  
    {
        
            password: {
                type: String,
                required: [true, 'password is required'],
                minlength: 8
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
            },
        
            tokens: [{
                access: {
                    type: String,
                    required: true
                },
                token: {
                    type: String,
                    required: true
                }
        
            }]
        
        }

)

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email'])
}

//this is used too create functions to manipulate instances of the user model
//dont use fat arrow functions so as to be able to use the 'this' to access instance values
UserSchema.methods.generateAuthTokens = function(){

    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access }, 'abc123').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });


};


var user = db.model('users', UserSchema );

module.exports = {user};


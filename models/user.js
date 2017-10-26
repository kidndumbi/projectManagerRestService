const {db} = require('../dbConnect.js');
var validator = require('validator');


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


var user = db.model('users', UserSchema );

module.exports = {user};


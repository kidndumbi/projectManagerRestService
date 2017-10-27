const {db} = require('../dbConnect.js');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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


//instance custom functions
UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email'])
}

//this is used too create functions to manipulate instances of the user model
//dont use fat arrow functions so as to be able to use the 'this' to access instance values
UserSchema.methods.generateAuthTokens = function(){

   

    let user = this;
     console.log('in generateTokens', user);
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access }, 'abc123').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });


};

//will run right before every save function for this model
UserSchema.pre('save', function(next){

    let user = this;

      if(user.isModified('password')) {
 
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {

                    user.password = hash;
                    console.log(user.password);
                    next();

            });
        });


      }else{

        next();
      }

  

});


//Model custom functions
UserSchema.statics.findByToken = function(token){

    let User = this;
    let decoded;

    //decode token from front end and secret to make surr user matches
 

    try {
        decoded = jwt.verify(token, 'abc123');
    }catch (e){
          
      return Promise.reject(e);
    }

    //quotes are required below for propert names when there is a dot in the value
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': "auth"
    });

}


var user = db.model('users', UserSchema );

module.exports = {user};


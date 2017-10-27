const {user} = require('../models/user'); 
 
 module.exports = {

      registerNewUser(req, res, next){

        let newUser = new user(req.body);

           newUser.save().then(() => {

            return newUser.generateAuthTokens();


            }).then((token) => {
                res.status(200).header('x-auth', token ).send(newUser.toJSON())
            }).catch(next);

            

      }

 }
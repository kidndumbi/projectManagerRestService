const {user} = require('../models/user'); 
 
 module.exports = {

      registerNewUser(req, res, next){

        let newUser = new user(req.body);

           newUser.save().then((doc) => {
               res.status(200).send(doc)
            }).catch(next);

            

      }

 }
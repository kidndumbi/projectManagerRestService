const {user} = require('../models/user'); 
 
 module.exports = {

      registerNewUser(req, res, next){

        let newUser = new user(req.body);

 

           newUser.save().then(() => {

            return newUser.generateAuthTokens();


            }).then((token) => {
                res.status(200).header('x-auth', token ).send(newUser.toJSON())
            }).catch(next);

            

      },

      //testing how to make private routes
      onlyMe(req, res, next) {

        

        let token = req.header('x-auth');

        user.findByToken(token).then((user) => {

            if(!user){
              return Promise.reject(e);
            }

            res.send(user);

        }).catch(() => {
            res.status(401).send({message: "authentication is required", status: 401});

        });



      }

 }
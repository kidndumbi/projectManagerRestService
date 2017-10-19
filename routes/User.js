var express = require('express')
var UserRouters = express.Router()

const {user} = require('../models/user');


UserRouters.post('/register', function (req, res) {

   let newUser = new user({  
       password: "megaman4",
       email: "kidndumbigmail.com"

   });

   newUser.save().then((doc) => {
    console.log("successful");
       res.send(doc)
    }).catch((err) =>{
        res.send(err)
    });

  
});



module.exports = {UserRouters}
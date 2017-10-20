var express = require('express')
var UserRouters = express.Router()
var _ = require('lodash');

const {user} = require('../models/user');


UserRouters.post('/register', function (req, res) {


   let newUser = new user(req.body);

   newUser.save().then((doc) => {
    console.log("successful");
    console.log(newUser.isNew)
       res.status(200).send(doc)
    }).catch((err) =>{
        res.status(400).send(err)
    });

  
});



module.exports = {UserRouters}
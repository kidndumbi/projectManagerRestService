var express = require('express')
var UserRouters = express.Router()
var _ = require('lodash');


const userController = require('../controllers/user_controller')


UserRouters.post('/register', userController.registerNewUser);

//testing private routes
UserRouters.get('/me', userController.onlyMe);



module.exports = {UserRouters}
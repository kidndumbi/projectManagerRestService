
const mongoose = require('mongoose');
const {mongoURI} = require('./configs/mongoDb');
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, {}).then(
    () => { console.log("connected to the database") },
    err => { console.log(err) }
);



module.exports = {db: mongoose};
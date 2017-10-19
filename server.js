const express = require('express');
const bodyParser = require('body-parser');
const {UserRouters} = require('./routes/User');

const app = express();
app.use(bodyParser.json());


////

app.use('/user', UserRouters);



app.get('/', (req, res) => {

    res.status(200).send({message: "slice that!"})

});


let port = process.env.PORT || 3000;


app.listen(port, () => {

      console.log(`connected to ${port}`);


});
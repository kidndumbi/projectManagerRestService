const express = require('express');
const bodyParser = require('body-parser');
const {UserRouters} = require('./routes/User');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


////

app.use('/api/user', UserRouters);



app.get('/', (req, res) => {

    console.log(JSON.parse(req.query.new))

    res.status(200).send({message: "slice that!"})

});


//handle erros
app.use((err, req, res, next) => {

    res.status(400).send(err);

});


let port = process.env.PORT || 3000;


app.listen(port, () => {

      console.log(`connected to ${port}`);


});
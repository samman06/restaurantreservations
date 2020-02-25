const express = require('express');
const app = express();
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const keys = require('./configs/keys');
const uri = keys.mongoURI;
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());

//start connection to database
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(uri, {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true
}, err => {
    if (!err) console.log("started mongodb connection");
    else console.log(err);

});



app.listen(PORT, (req, res) => {
    console.log("server running on port: " + PORT);
});


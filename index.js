const express = require('express');
const app = express();
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const TableModel = require('./models/table');
const dummyTables = require('./dummyData/tables')();
const tableRouter = require('./routes/table');
const reservationRouter = require('./routes/reservation');
const PORT = process.env.PORT || 4000;
const keys = require('./configs/keys');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

//start connection to database
const uri = keys.mongoURI;
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

// table router
app.use('/table', tableRouter);
// reservations router
app.use('/reservation', reservationRouter);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const insertDummyTables = async() => {
    const data = await TableModel.find();
    if (data.length !== 0) return;
    await dummyTables.map(table => {
        const newTable = new TableModel(table);
        newTable.save()
    });
};
insertDummyTables().then();

app.listen(PORT, (req, res) => {
    console.log("server running on port: " + PORT);
});

module.exports = app

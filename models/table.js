const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tableSchema = new Schema({
    tableNumber: {type: String},
    numberOfPerson: {type: String},
});

const Table = mongoose.model('table', tableSchema);
module.exports = Table;

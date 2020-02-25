const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    reserveDate: {
        type: String,
        require: true
    },
    reserveTime: [{
        from: {
            type: Number,
            require: true
        },
        to: {
            type: Number,
            require: true
        },
    }],
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'table'
    },
});

const Reservation = mongoose.model('reservation', reservationSchema);
module.exports = Reservation;

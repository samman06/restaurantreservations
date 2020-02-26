const Reservation = require('../models/reservation');
const Table = require('../models/table');
const validationReservationInput = require("../validation/reservations");
const validateGetReservationInput = require("../validation/getReservations");

class reservationController {

    async addNewReservation(req, res) {
        const {isValid, errors} = validationReservationInput(req.body);
        if (!isValid) return res.json({errors});
        const currentDate = new Date().toJSON().slice(0, 10);
        const {reserveDate} = req.body;
        if (reserveDate < currentDate)
            return res.json({error: 'sorry, you can not reserve table for a reserveDate before today'});
        const {tableId, clientName, from, to} = req.body;
        try {
            const table = await Table.findById(tableId);
            if (!table) return res.status(400).json({table: 'this table dose not exist'});
            let reservation = await Reservation.findOne({tableId, reserveDate});
            const {message} = await this.createNewReserveOrNotAvailableTime(reservation, tableId, clientName, reserveDate, from, to);
            if (message.indexOf("Created") >= 0) return res.status(201).json({message: message});
            if (message.indexOf("Table") >= 0) return res.status(201).json({errors: {table: message}});
            reservation.reserveTime.push({from, to});
            await reservation.save();
            return res.status(201).json({message: "Created reservation successfully",})
        } catch (e) {
            return res.status(500).json({error: e})
        }
    }

    async getReservationsForSpecificDate(req, res) {
        const {reserveDate} = req.params;
        const {isValid, errors} = validateGetReservationInput(reserveDate);
        if (!isValid) return res.json({errors});
        try {
            const reservationsOfSpecificDate = await Reservation.find({reserveDate}).populate('tableId');
            return res.send(reservationsOfSpecificDate)
        } catch (e) {
            return res.send({"err": e})
        }
    }

    getAvailableHoursForReserve(reservation) {
        let availableHoursForReserve =
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        reservation.reserveTime.map(({from, to}) => {
            let indexOfReservedTime = availableHoursForReserve.indexOf(from);
            let numberOfReservedHour = to - from;
            availableHoursForReserve.splice(indexOfReservedTime, numberOfReservedHour);
        });
        return availableHoursForReserve;
    }

    async createNewReserveOrNotAvailableTime(reservation, tableId, clientName, reserveDate, from, to) {
        if (!reservation) {
            reservation = new Reservation({tableId, clientName, reserveDate, reserveTime: [{from, to}]});
            await reservation.save();
            return {message: "Created reservation successfully"}
        } else {
            const availableHoursForReserve = this.getAvailableHoursForReserve(reservation);
            let reserveHour;
            for (reserveHour = Number(from); reserveHour < Number(to); reserveHour++) {
                let indexOfReservedHour = availableHoursForReserve.indexOf(reserveHour);
                if (indexOfReservedHour < 0) return {message: `Table doesn't  available on ${reserveDate} at ${reserveHour}`};
            }
            return {message: "available"};
        }
    }
}

module.exports = reservationController;

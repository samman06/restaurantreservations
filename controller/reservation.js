const Reservation = require('../models/reservation');

class reservationController {

    async getReservationsForSpecificDate(req, res) {
        const {reserveDate} = req.params;
        try {
            const reservationsOfSpecificDate = await Reservation.find({reserveDate}).populate('tableId');
            return res.send(reservationsOfSpecificDate)
        } catch (e) {
            return res.send({"err": e})
        }
    }

}

module.exports = reservationController;

const express = require('express');
const reservationRouter = express.Router();
const reservationController = require("../controller/reservation");
const reservation = new reservationController();

//add new reservation
reservationRouter.post('/', async (req, res) => {
    await reservation.addNewReservation(req, res)
});

//get all reservations table for a specific date
reservationRouter.get('/:reserveDate', async (req, res) => {
    await reservation.getReservationsForSpecificDate(req, res)
});

module.exports = reservationRouter;

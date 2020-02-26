import axios from 'axios'

// add New Reservation
export const addNewReservation = (reservationData) => {
    return axios.post(`http://127.0.0.1:4000/reservation/`, reservationData)
        .then(reservation => reservation)
        .catch(err => err);
};

// get Reservations ForSpecificDate
export const getReservationsForSpecificDate = (reserveDate) => {
    return axios.get(`http://127.0.0.1:4000/reservation/${reserveDate}`)
        .then(reservations => reservations)
        .catch(err => err);
};


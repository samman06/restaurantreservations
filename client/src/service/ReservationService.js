import axios from 'axios'
let URI = "http://localhost:4000";
if (process.env.NODE_ENV === "production") {
    URI = "https://restaurantreservations.herokuapp.com"
}

// add New Reservation
export const addNewReservation = (reservationData) => {
    return axios.post(`${URI}/reservation/`, reservationData)
        .then(reservation => reservation)
        .catch(err => err);
};

// get Reservations ForSpecificDate
export const getReservationsForSpecificDate = (reserveDate) => {
    return axios.get(`${URI}/reservation/${reserveDate}`)
        .then(reservations => reservations)
        .catch(err => err);
};


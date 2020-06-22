import axios from 'axios'
let URI = "http://localhost:4000";
if (process.env.NODE_ENV === "production") {
    URI = "https://restaurantreservations.herokuapp.com"
}

// Get All tables
export const getAllTables = () => {
    return axios.get(`${URI}/table/`)
        .then(tables => tables)
        .catch(err => err);
};

// Get All Available Reservations
export const getAvailableTables = () => {
    return axios.get(`${URI}/table/available`)
        .then(tables => tables)
        .catch(err => err);
};

// Add New table
export const addNewTable = (tableData) => {
    return axios.post(`${URI}/table/`,tableData)
        .then(tables => tables)
        .catch(err => err);
};

// Delete table
export const deleteTable = (tableId) => {
    return axios.delete(`${URI}/table/${tableId}`)
        .then(tables => tables)
        .catch(err => err);
};

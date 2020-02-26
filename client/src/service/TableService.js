import axios from 'axios'

// Get All tables
export const getAllTables = () => {
    return axios.get(`http://127.0.0.1:4000/table/`)
        .then(tables => tables)
        .catch(err => err);
};

// Add New table
export const addNewTable = (tableData) => {
    return axios.post(`http://127.0.0.1:4000/table/`,tableData)
        .then(tables => tables)
        .catch(err => err);
};

// Delete table
export const deleteTable = (tableId) => {
    return axios.delete(`http://127.0.0.1:4000/table/${tableId}`)
        .then(tables => tables)
        .catch(err => err);
};

import axios from 'axios'

// Get All tables
export const getAllTables = () => {
    return axios.get(`http://127.0.0.1:4000/table/`)
        .then(tables => tables)
        .catch(err => err);
};

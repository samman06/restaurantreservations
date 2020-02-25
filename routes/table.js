const express = require('express');
const tableController = require("../controller/table");
const tableRouter = express.Router();
const table = new tableController();

//get all tables
tableRouter.get('/', async (req, res) => {
    await table.getAllTables(req, res)
});

//add new table
tableRouter.post('/', async (req, res) => {
    await table.addNewTable(req, res);
});

//get all the currently available tables
tableRouter.get('/available', async (req, res) => {
    await table.getAvailableTables(req, res);
});

//delete table by id
tableRouter.delete('/:id', async (req, res) => {
    await table.deleteTable(req, res);
});


module.exports = tableRouter;

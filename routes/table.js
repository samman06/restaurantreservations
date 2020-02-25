const express = require('express');
const tableController = require("../controller/table");
const tableRouter = express.Router();
const table = new tableController();

//get all tables
tableRouter.get('/', async (req, res) => {
    await table.getAllTables(req, res)
});

module.exports = tableRouter;

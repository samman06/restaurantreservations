const Table = require('../models/table');

class tablesController {
    async getAllTables(req, res) {
        try {
            const tables = await Table.find();
            return res.json(tables)
        } catch (e) {
            return res.send('error in getting tables')
        }
    };

}

module.exports = tablesController;

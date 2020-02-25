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

    async deleteTable(req, res) {
        try {
            const table = await Table.findByIdAndRemove(req.params.id);
            await Reservation.remove({tableId: table._id});
            return res.json({msg: 'deleted'});
        } catch (e) {
            return res.status(404).send({error:'error in delete data'});
        }
    }


}

module.exports = tablesController;

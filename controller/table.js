const Table = require('../models/table');
const validationTableInput = require("../validation/table");

class tablesController {
    async getAllTables(req, res) {
        try {
            const tables = await Table.find();
            return res.json(tables)
        } catch (e) {
            return res.send('error in getting tables')
        }
    };

    async addNewTable(req, res) {
        const {isValid, errors} = validationTableInput(req.body);
        if (!isValid) return res.json({errors});
        try {
            const {tableNumber, numberOfPerson} = req.body;
            const table = await Table.findOne({tableNumber});
            if (table) return res.status(201).json({errors: {tableNumber: 'The table is already exists'}});
            const newTable = await new Table({
                tableNumber, numberOfPerson
            });
            const {_id} = await newTable.save();
            return res.status(201).json({_id,message: "The table is Created successfully",})
        } catch (e) {
            return res.status(500).json({error: err})
        }

    }


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

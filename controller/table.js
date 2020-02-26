const Table = require('../models/table');
const validationTableInput = require("../validation/table");
const Reservation = require('../models/reservation');

class tablesController {
    async getAllTables(req, res) {
        try {
            const tables = await Table.find();
            return res.status(200).json(tables)
        } catch (e) {
            return res.send('error in getting tables')
        }
    };

    async addNewTable(req, res) {
        const {isValid, errors} = validationTableInput(req.body);
        if (!isValid) return res.status(405).json({errors});
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

    async getAvailableTables(req, res) {
        const reserveDate = new Date().toJSON().slice(0, 10);
        try {
            const reservations = await Reservation.find({reserveDate}, {tableId: 1, _id: 0, reserveTime: 1});
            const tableTimeReservations = this.getTableTimeReservations(reservations);
            const allTables = await Table.find();
            const availableTables = this.getCurrentlyAvailableTables(allTables,tableTimeReservations);
            return res.send(availableTables)
        } catch (e) {
            return res.send('error in getting data')
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

    getTableTimeReservations(reservations){
        const tableTimeReservations = {};
        reservations.map(({tableId, reserveTime}) => {
            let hoursOfDay =
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
            reserveTime.map(({from, to}) => {
                let indexOfReservedTime = hoursOfDay.indexOf(from);
                let numberOfReservedHour = to - from;
                hoursOfDay.splice(indexOfReservedTime, numberOfReservedHour);
            });
            tableTimeReservations[tableId] = [...hoursOfDay]
        });
        return tableTimeReservations
    }
    getCurrentlyAvailableTables(allTables,tableTimeReservations){
        const availableTables = allTables.map(table => {
            let times = [];
            if (String(table._id) in tableTimeReservations) {
                times = tableTimeReservations[String(table._id)]
            }
            const {_id, tableNumber, numberOfPerson} = table;
            return {_id, tableNumber, numberOfPerson, times};
        });
        return availableTables;
    }
}

module.exports = tablesController;

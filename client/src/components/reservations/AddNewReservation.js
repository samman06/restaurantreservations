import React, {Component} from 'react';
import {addNewReservation} from "../../service/ReservationService"
import {getAllTables} from "../../service/TableService"
import TextFieldGroup from "../common/TextFieldGroup"
import SelectListGroup from "../common/SelectListGroup"
import classnames from "classnames";

class AddNewReservation extends Component {
    constructor() {
        super();
        this.state = {
            reserveDate: new Date().toJSON().slice(0, 10),
            from: "", to: "", tableNumbers: [], tableId: "",
            message: "", errors: {}
        };
    }

    async componentDidMount() {
        let {data} = await getAllTables();
        let tableNumbers = await data.map(({_id, tableNumber}) => ({_id, tableNumber}));
        this.setState({tableNumbers: [{_id: "", tableNumber: "choose table"}, ...tableNumbers]});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {tableId, reserveDate, from, to} = this.state;
        const reserveData = {tableId, reserveDate, from, to};

        addNewReservation(reserveData).then(table => {
            if (table.data) {
                const {message, errors} = table.data;
                if (message) {
                    this.setState({
                        tableId: "", reserveDate: "",
                        from: "", to: "", message, errors: {}
                    })
                } else {
                    this.setState({errors, message: ""})
                }
            }
        })
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        let {errors, reserveDate, from, to, tableId, message, tableNumbers} = this.state;
        if (reserveDate === "")
            reserveDate = new Date().toJSON().slice(0, 10)
        let hours = [...Array(25).keys()];
        const selectOptionTable = tableNumbers.map(({_id, tableNumber}) => (
            <option key={_id} value={_id}>
                {tableNumber}
            </option>
        ));
        return (
            <div className="container">
                <p className="lead text-center">
                    Add New Table
                </p>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect2">table Number</label>
                        <select
                            className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.table
                            })}
                            name="tableId" value={tableId}
                            onChange={this.onChange}>
                            {selectOptionTable}
                        </select>
                        {errors.table && <div className="invalid-feedback">{errors.table}</div>}
                    </div>
                    <TextFieldGroup
                        placeholder="Reserve Date" name="reserveDate" type="date"
                        value={reserveDate} error={errors.reserveDate} onChange={this.onChange}
                    />
                    <SelectListGroup
                        name="from" value={from} options={hours}
                        onChange={this.onChange} error={errors.from}
                    />
                    <SelectListGroup
                        name="to" options={hours} value={to}
                        onChange={this.onChange} error={errors.to}
                    />
                    {message && <div className="text-success">{message}</div>}
                    <input type="submit" className="btn btn-info btn-block mt-4"/>
                </form>
            </div>
        );
    }
}

export default AddNewReservation;

import React, {Component} from 'react';
import {addNewTable} from "../../service/TableService"
import TextFieldGroup from "../common/TextFieldGroup"

class AddNewTable extends Component {
    constructor() {
        super();
        this.state = {
            tableNumber: '',
            numberOfPerson: '',
            message: "",
            errors: {}
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {tableNumber, numberOfPerson} = this.state;
        const tableData = {
            tableNumber, numberOfPerson
        };
        addNewTable(tableData).then(table => {
            if (table.data) {
                const {message, errors} = table.data;
                if (message) {
                    this.setState({
                        tableNumber: "",
                        numberOfPerson: "",
                        message, errors: {}
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
        const {errors, tableNumber, numberOfPerson, message} = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <p className="lead text-center">
                                Add New Table
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Table Number"
                                    name="tableNumber"
                                    type="number"
                                    value={tableNumber}
                                    onChange={this.onChange}
                                    error={errors.tableNumber}
                                />
                                <TextFieldGroup
                                    placeholder="Number Of Person"
                                    name="numberOfPerson"
                                    type="number"
                                    value={numberOfPerson}
                                    onChange={this.onChange}
                                    error={errors.numberOfPerson}
                                />
                                {message && <div className="text-success">{message}</div>}
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default AddNewTable;

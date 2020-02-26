import React, {Component} from 'react';
import {getAvailableTables} from "../../service/TableService"
import AvailableTablesData from "./AvailableTablesData"
import TableRoute from "../common/TableRoute"

class AvailableTables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [], errors: {}
        };
    }
    componentDidMount() {
        getAvailableTables()
            .then(tables => {
                this.setState({tables: tables.data})
            });
    }
    render() {
        let {tables} = this.state;
        let tablesData;
        if (tables.length === 0) {
            tablesData = (
                <div>
                    <h3 className="m-5">there is no table</h3>
                </div>
            )
        } else {
            tablesData = <AvailableTablesData tables={tables}/>
        }
        return (
            <div>
                <TableRoute/>
                <h3 className="p-2">Available Tables For Today</h3>
                {tablesData}
            </div>
        );
    }
}

export default AvailableTables;

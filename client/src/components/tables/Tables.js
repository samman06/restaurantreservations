import React, {Component} from 'react';
import {getAllTables} from "../../service/TableService"
import TableRoute from "../common/TableRoute"

import TablesData from "./TablesData"

class Tables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [],
            errors: {}
        };
    }

    componentDidMount() {
        getAllTables()
            .then(tables => {
                this.setState({tables: tables.data})
            });
    }

    render() {
        let {tables} = this.state;
        let tablesData;
        if (tables.length === 0) {
            tablesData = (
                <div >
                    <h3 className="m-5">
                        there is no table
                    </h3>
                </div>
            )
        } else {
            tablesData = <TablesData tables={tables}/>
        }
        return (
            <div>
                <TableRoute/>
                {tablesData}
            </div>
        );
    }
}

export default Tables;

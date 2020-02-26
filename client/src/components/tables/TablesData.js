import React, {Component} from 'react';
import TableItem from "./TableItem";
import {deleteTable} from "../../service/TableService";

class TablesData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: this.props.tables,
        }
    }

    onClickDelete = (tableId) => {
        deleteTable(tableId);
        let tables = this.state.tables.filter(table => table._id !== tableId);
        this.setState({tables})
    };

    render() {
        const {tables} = this.state;
        const tableItem = tables.map(table => <TableItem key={table._id} table={table}
                                                         onClick={() => this.onClickDelete(table._id)}/>);
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    {tableItem}
                </div>
            </div>
        )
    }
}

export default TablesData;

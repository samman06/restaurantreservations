import React, {Component} from 'react';
import TableItem from "./TableItem";

class TablesData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: this.props.tables,
        }
    }

    onClickDelete = (tableId) => {
        console.log(1);
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

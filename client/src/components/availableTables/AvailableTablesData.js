import React, {Component} from 'react';
import AvailableTableItem from "./AvailableTableItem";

class AvailableTablesData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: this.props.tables,
        }
    }

    render() {
        const {tables} = this.state;
        const tableItem = tables.map(table => <AvailableTableItem key={table._id} table={table}/>);
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    {tableItem}
                </div>
            </div>
        )
    }
}
export default AvailableTablesData;

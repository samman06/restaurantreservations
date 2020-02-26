import React, {Component} from 'react';
import {Link} from "react-router-dom";

class TableItem extends Component {
    render() {
        const {table} = this.props;
        return (
            <div className="col-lg-5 col-md-12 row border m-5 p-4">
                <div className="col-7 row">
                    <div className="col-12">
                        <p className="h3">table number {table.tableNumber} </p>
                    </div>
                    <div className="col-12">
                        <p className="h3">number of person {table.numberOfPerson}</p>
                    </div>
                </div>
                <div className="col-5">
                    <Link to="/reservations" className="btn btn-success mt-3 ml-2 mr-4">Reserve</Link>
                    <button type="button" className="btn btn-danger mt-3"
                            onClick={this.props.onClick}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

export default TableItem;

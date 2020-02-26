import React, {Component} from 'react';
import {Link} from "react-router-dom";

class AvailableTableItem extends Component {
    render() {
        const {table} = this.props;
        let availableTime;
        if (table.times.length === 0) {
            availableTime = (<span className=" align-middle">all the day</span>)
        } else {
            availableTime = (
                table.times.map(time => (<button key={time} className="btn btn-warning m-1">{time}</button>))
            )
        }
        return (
            <div className="col-12 row border m-1 p-4">
                <div className="col-12 row mb-2">
                    <div className="col-3">
                        <p className="h3">table number {table.tableNumber} </p>
                    </div>
                    <div className="col-3">
                        <p className="h3">number of person {table.numberOfPerson}</p>
                    </div>
                    <div className="col-3">
                        <Link to="/reservations" className="btn btn-success">Reserve</Link>
                    </div>
                </div>
                <div className="col-12 ">
                    <p className="h3">
                        this table available on : {availableTime} Hours
                    </p>
                </div>
            </div>
        );
    }
}

export default AvailableTableItem;

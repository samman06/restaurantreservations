import React, {Component} from 'react';

class ReservationItem extends Component {
    render() {
        const {reservation} = this.props;
        let availableTime;
        availableTime = (
            reservation.reserveTime.map(({_id, from, to}) => (
                <button key={_id} className="btn btn-warning m-1">
                    from {from} : {to}
                </button>
            ))
        );
        return (

            <div className="col-12 row border m-1 p-4">
                <div className="col-12 row mb-2">
                    <div className="col-3">
                        <p className="h3">Reservation Number : {reservation.tableId.tableNumber} </p>
                    </div>
                    <div className="col-3">
                        <p className="h3">Number Of Person : {reservation.tableId.numberOfPerson}</p>
                    </div>
                    <div className="col-3">
                        Date : {reservation.reserveDate}
                    </div>
                </div>
                <div className="col-12 ">
                    <p className="h3">
                        this table reserved on : {availableTime} Hours
                    </p>
                </div>
            </div>
        );
    }
}

export default ReservationItem;

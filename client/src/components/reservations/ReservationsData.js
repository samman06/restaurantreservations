import React, {Component} from 'react';
import ReservationItem from "./ReservationItem";

class ReservationsData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
        }
    }

    render() {
        const {reservations} = this.props;
        const reservationItem = reservations.map(reservation => (
                <ReservationItem key={reservation._id} reservation={reservation}/>
            )
        );
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    {reservationItem}
                </div>
            </div>
        )
    }
}

export default ReservationsData;

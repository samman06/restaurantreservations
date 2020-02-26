import React, {Component} from 'react';
import {Link} from "react-router-dom";
import AddNewReservation from "./AddNewReservation"

class Reservations extends Component {
    render() {
        return (
            <div>
                <div className="row p-2 ">
                    <div className="col-2 ">
                        <Link to='/reservations/reserve' className="btn-primary form-control">
                            Get Reservations
                        </Link>
                    </div>
                </div>
                <AddNewReservation/>
            </div>
        );
    }
}
export default Reservations;

import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {getReservationsForSpecificDate} from "../../service/ReservationService"
import ReservationsData from "./ReservationsData"

class Reservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reserveDate: new Date().toJSON().slice(0, 10),
            reservations: [], errors: {}
        };
    }

    async componentDidMount() {
        await this.getReservations()
    }

    getReservations = async () => {
        const {reserveDate} = this.state;
        const reservations = await getReservationsForSpecificDate(reserveDate)
        this.setState({reservations: reservations.data})
    };
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        let {reservations, reserveDate} = this.state;
        if (reserveDate === "")
            reserveDate = new Date().toJSON().slice(0, 10)

        let reservationsData;
        if (reservations.length === 0) {
            reservationsData = (
                <div>
                    <h3 className="m-5">there is no reservation for this day</h3>
                </div>
            )
        } else {
            reservationsData = <ReservationsData reservations={reservations}/>
        }

        return (
            <div>
                <div className="row p-2 ">
                    <div className="col-2 ">
                        <Link to={`/reservations/reserve`}
                              className="btn-primary form-control"
                              onClick={this.getReservations}
                        >
                            Get Reservations
                        </Link>
                    </div>
                    <div className="col-2">
                        <input
                            className="form-control" name="reserveDate" type="date"
                            value={reserveDate} onChange={this.onChange}
                        />
                    </div>
                </div>
                {reservationsData}
            </div>
        );
    }
}


export default Reservations;

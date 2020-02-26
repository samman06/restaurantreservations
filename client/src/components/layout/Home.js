import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="mb-4">Welcome To our Restaurant</h1>
                                <p className="lead">
                                    {' '}
                                    Enjoy With Our Food
                                </p>
                                <hr/>
                                <Link to="/tables" className="btn btn-lg btn-dark mr-2">
                                    Tables
                                </Link>
                                <Link to="/reservations" className="btn btn-lg btn-warning">
                                    Reservations
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;

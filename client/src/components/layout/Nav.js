import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Nav extends Component {
    render() {
        return (
            <div className='container-fluid navIBack '>
                <nav className="mb-1 navIBack navbar navbar-expand-lg navbar-dark orange lighten-1">
                    <Link to={'/'} className="navbar-brand">Restaurant
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to={'/tables/'} className="nav-link">Tables
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/reservations/'} className="nav-link">
                                    Reservations
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Nav;

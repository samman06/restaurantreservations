import React from 'react';
import {Link} from "react-router-dom";

const TableRoute = () => {
    return (
        <div>
            <div>
                <Link to="/tables/new" className="m-2 btn btn-lg btn-warning">
                    add new table
                </Link>
            </div>
            <div>
                <Link to="/tables/" className="m-2 btn btn-lg btn-warning">
                    All Tables
                </Link>
                <Link to="/tables/available" className="m-2 btn btn-lg btn-warning">
                    Available Tables
                </Link>
            </div>
        </div>
    );
};

export default TableRoute

import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import './App.css';

import Nav from "./components/layout/Nav";
import Home from "./components/layout/Home";
import Tables from "./components/tables/Tables"
import AddNewTable from "./components/tables/AddNewTable"
import AvailableTables from "./components/availableTables/AvailableTables"

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className='App'>
                    <Route path='/' exact component={Nav}/>
                    <Route path='/' exact component={Home}/>

                    <Route path='/tables' exact component={Nav}/>
                    <Route path='/tables' exact component={Tables}/>
                    <Route path='/tables/available' exact component={Nav}/>
                    <Route path='/tables/available' exact component={AvailableTables}/>
                    <Route path='/tables/new' exact component={Nav}/>
                    <Route path='/tables/new' exact component={AddNewTable}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Patient from "./Patient";
import Control from "./Control";

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <header>
                        <h1>Medical Card</h1>
                    </header>
                    <div class="layout">
                        <div class="dataframe" id="list">
                            <h2>Patient list</h2>
                            <Route component={Control} />
                        </div>
                        <div class="dataframe" id="info">
                            <h2>Patient Info</h2>
                            <Route component={Patient} />
                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }
}


export default Main;

import React, {Component} from "react";
import {
    NavLink
} from "react-router-dom";
import Fhir from "fhir.js";

let client = Fhir({
    baseUrl: process.env.SERVER_URL || 'http://localhost:8888',
    debug: process.env.DEBUG || false,
    auth: {user: 'zorkijofficial@gmail.com', pass: 'secret'}
});

let args = {
    resource: {
        resourceType: "Patient",
        id: '00000',
        gender: 'pidor',
        name: [{family: 'xxx'}],
    }
};



class Control extends Component {
    constructor(props) {
        super(props);
        this.state = {i: 0};
    }
    addPatient() {
        /*return (client.create(args)) working!!! */
        //this.setState({hui: !this.state.hui});
        //console.log(this.state.hui);
        this.setState({i: this.state.i + 1});
        console.log(this.state.i);
    }
    render(){
        return(
            <div>
                <form class="controls">
                    <div class="searchpane">
                        <input type="text" class="textfield" id="search" placeholder="Search..." />
                        <input type="button" name="find" class="textfield" id="find" value="Find" />
                    </div>
                    <div>
                        {/*<input type="button" name="newPatient" class="btn" id="newpatient" value="New patient" onClick={this.action()} />*/}
                        <input type="button" class="btn" value="New patient" onClick={(i) => this.addPatient(i)} />
                    </div>
                    {/* TODO: dynamic list */}
                    <div class="navpane">
                        <p>Total count: </p>
                        <ul>
                            <li class="nav-disabled"><NavLink to="#">«</NavLink></li>
                            <li class="nav-disabled"><NavLink to="#">‹</NavLink></li>
                            <li class="nav"><NavLink to="#">1</NavLink></li>
                            <li class="nav-disabled"><NavLink to="#">›</NavLink></li>
                            <li class="nav-disabled"><NavLink to="#">»</NavLink></li>
                        </ul>
                    </div>
                </form>
            </div>
        )
    }
}

export default Control;

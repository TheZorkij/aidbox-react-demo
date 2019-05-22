import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
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

function Entry(props) {
    return (
        <button>
            {props.value}
        </button>
    );
}

class PatientList extends Component {
    renderEntry(i) {
        console.log(this.props.kal);
        return <Entry value={this.props.kal} />
    }

    render() {
        return (
            <div>
                {this.renderEntry(0)}
                {this.renderEntry(1)}
                {this.renderEntry(2)}
            </div>
        );
    }
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            i: 0,
            createMode: false,
            kal: 'a',
            patient: [{
                id: null,
                firstName: 'kal govna',
                lastName: null,
                gender: null,
                birthdate: null,
                street: null,
                state: null,
                city: null,
                postalCode: null,
                phones: null,
                emails: null
            }],
        };
    }

    createMode() {
        this.setState({
            createMode: true,
        })
    }

    addPatient() {  //this is working nigga
        /*return (client.create(args)) working!!! */
        /*this.setState({i: this.state.i + 1});*/
        //console.log(this.state.i);
        const that = this;
        client.search({resource: {resourceType: 'Patient'}})
              .then(function(res) {
                  const bundle = res.data;
                  const id = bundle.entry[0].resource.id;
                  return id;
              }).then(function(id) {
                  that.setState({kal: id})
                  console.log(id);
              });
    }

    handle(i) {
            const patient = this.state.patient.slice(0, this.state.i + 1);
            const current = patient[patient.length - 1];
            this.setState({
                patient: patient.concat([{
                    firstName: i,
                }]),
                i: patient.length,
            });
    }

    render() {
        const update = this.state.createMode ? {display: 'none'} : {};
        const submit = this.state.createMode ? {} : {display: 'none'};
        const that = this;
        const patient = this.state.patient;
        const current = patient[this.state.i];
        //if I call some shit here it will execute every time some shit happens
        const moves = patient.map((step, move, hui) => {
            console.log(step);
            console.log(hui);
            //console.log(move);
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (<li key={move}>
                <button>
                {desc}
        </button>
</li>)
        });
        //client.search({resource: {resourceType: 'Patient'}})
        //      .then(function(res) {
        //         const bundle = res.data;
        //          const id = bundle.entry[0].resource.id;
        //          return id;
        //      }).then(function(id) {
        //          that.setState({kal: id})
        //          console.log(id);
        //      });
        return (
                <div>
                    <header>
                        <h1>Medical Card</h1>
                        {/*<p>AIDBOX_URL: {window._env_.AIDBOX_URL}</p>*/}
                    </header>
                    <div class="layout">
                        <div class="dataframe" id="list">
                            <h2>Patient list</h2>
                            <div>
                                <HashRouter>
                                    <form class="controls">
                                        <div class="searchpane">
                                            <input type="text" class="textfield" id="search" placeholder="Search..." />
                                            <input type="button" name="find" class="textfield" id="find" value="Find" />
                                        </div>
                                        <div>
                                            {/*<input type="button" name="newPatient" class="btn" id="newpatient" value="New patient" onClick={this.action()} />*/}
                                            <input type="button" class="btn" value="New patient" onClick={() => this.createMode()} />
                                            <input type="button" onClick={(i) => this.handle(i)} />
                                        </div>
                                        <div>
                                            <ul>
                                                {moves}
                                                {/*<PatientList kal={this.state.kal}/>*/}
                                            </ul>
                                        </div>
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
                                </HashRouter>
                            </div>
                        </div>
                        <div class="dataframe" id="info">
                            <h2>Patient Info</h2>
                            <div>
                                <form class="patient-props">
                                    <div class="row-info">
                                        <label for="firstName">First name</label>
                                        <input name="firstName" class="textfield" value={this.state.kal}
                                               onChange={e => this.setState({kal: e.target.value})} />
                                    </div>
                                    <div class="row-info">
                                        <label for="lastName">Last name</label>
                                        <input name="lastName" class="textfield" value={this.state.patient[0].lastName}
                                               onChange={e => this.setState({patient:[{lastName: e.target.value}]})} />
                                    </div>
                                    <div class="row-info">
                                        <label for="gender">Gender</label>
                                        <input name="gender" class="textfield" value={this.state.patient[0].gender}
                                               onChange={e => this.setState({patient:[{gender: e.target.value}]})}/>
                                    </div>
                                    <div class="row-info">
                                        <label for="birthDate">Birth date</label>
                                        <input name="birthDate" class="textfield" value={this.state.patient[0].birthdate}
                                               onChange={e => this.setState({patient:[{birthdate: e.target.value}]})}/>
                                    </div>
                                    <div class="row-info">
                                        <label for="street">Street</label>
                                        <input name="street" class="textfield" value={this.state.patient[0].street}
                                               onChange={e => this.setState({patient:[{street: e.target.value}]})}/>
                                    </div>
                                    <div class="row-info">
                                        <label for="state">State</label>
                                        <input name="state" class="textfield" value={this.state.patient[0].state}
                                               onChange={e => this.setState({patient:[{state: e.target.value}]})}/>
                                    </div>
                                    <div class="row-info">
                                        <label for="city">City</label>
                                        <input name="city" class="textfield" value={this.state.patient[0].city}
                                               onChange={e => this.setState({patient:[{city: e.target.value}]})}/>
                                    </div>
                                    <div class="row-info">
                                        <label for="postalCode">Postal code</label>
                                        <input name="postalCode" class="textfield" value={this.state.patient[0].postalCode}
                                               onChange={e => this.setState({patient:[{postalCode: e.target.value}]})}/>
                                    </div>
                                    <div class="row-info">
                                        <label for="phones">Phones</label>
                                        <input name="phones" class="textfield" value={this.state.patient[0].phones}
                                               onChange={e => this.setState({patient:[{phones: e.target.value}]})}/>
                                    </div>
                                    <div class="row-info">
                                        <label for="emails">Emails</label>
                                        <input name="emails" class="textfield" value={this.state.patient[0].emails}
                                               onChange={e => this.setState({patient:[{emails: e.target.value}]})}/>
                                    </div>
                                    <div class="buttonpane">
                                        <div style={update}>
                                            <input type="button" name="update" class="btn" value="Update" />
                                            <input type="button" name="delete" class="btn" id="del" value="Delete" />
                                        </div>
                                        <div style={submit}>
                                            <input type="button" name="submit" class="btn" value="Submit" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}


export default Main;

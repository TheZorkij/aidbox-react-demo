/**
 * @author Михаил Правиленко <zorkijofficial@gmail.com>
 */

import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import Fhir from "fhir.js";

/**
 * Создает экземпляр клиента FHIR
 *
 * @constructor
 * @param {object} - параметры для соединения с сервером
 */
let client = Fhir({
    baseUrl: process.env.SERVER_URL || 'http://localhost:8888',
    debug: process.env.DEBUG || false,
    auth: {user: 'zorkijofficial@gmail.com', pass: 'secret'}
});

/**
 * Класс главного компонента приложения
 *
 */
class Main extends Component {

    /**
     * Конструктор свойств компонента
     *
     * @constructor
     * @this {Main}
     * @param {object} props - свойства компонента
    */
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            count: 0,
            createMode: false,
            isLoaded: false,
            searchParam: null,
            patient: [],
            firstName: '',
            lastName: '',
            gender: '',
            birthdate: '',
            street: '',
            state: '',
            city: '',
            postalCode: '',
            phones: '',
        };
    }

    /**
     * Изменяет свойство createMode, чтобы отобразить кнопку Submit
     *
     * @this {Main}
     */
    createMode() {
        this.setState({
            createMode: true,
        })
    }

    //~~~~~~~ CRUD ~~~~~~~~~~

    //!!! must have 4 digits in birthdate
    /**
     * Отправляет на сервер созданного пациента
     *
     * @this {Main}
     */
    addPatient() {
        const args = {
            resource: {
                resourceType: "Patient",
                name: [{
                    given: [this.state.firstName],
                    family: this.state.lastName,
                }],
                gender: this.state.gender,
                birthDate: this.state.birthdate,
                address: [{
                    line: [this.state.street],
                    city: this.state.city,
                    state: this.state.state,
                    postalCode: this.state.postalCode,
                }],
                telecom: [{
                    system: 'phone',
                    value: this.state.phones
                }]
            }
        }
        const that = this;
        client.create(args).then(() => {that.getPatients()});
        this.setState({createMode: false});
    }

    /**
     * Удаляет с сервера информацию о выбранном пациенте
     *
     * @this {Main}
     */
    deletePatient() {
        const args = {
            resource: {
                resourceType: "Patient",
                id: this.state.patient[this.state.current].id,
            }
        }
        const that = this;
        client.delete(args).then(() => {that.getPatients()});
    }

    /**
     * Обновляет информацию о пациенте на сервере
     *
     * @this {Main}
    */
    updatePatient() {
        const patient = this.state.patient[this.state.current];
        const args = {
            resource: {
                resourceType: "Patient",
                id: this.state.patient[this.state.current].id,
                name: [{
                    given: [patient.firstName],
                    family: patient.lastName,
                }],
                gender: patient.gender,
                birthDate: patient.birthdate,
                address: [{
                    line: [patient.street],
                    city: patient.city,
                    state: patient.state,
                    postalCode: patient.postalCode,
                }],
                telecom: [{
                    system: 'phone',
                    value: patient.phones
                }]
            }
        }
        const that = this;
        client.update(args).then(() => {that.getPatients()});
    }

    /**
     * Извлекает с сервера данные о пациентах
     *
     * @this {Main}
    */
    getPatients() {
        const that = this;
        const param = this.state.searchParam;
        (param ? client.search({resource: {resourceType: "Patient"}, query: {name: param}}) : client.search({resource: {resourceType: "Patient"}}))
              .then(function(res) {
                  const bundle = res.data;
                  //console.log(bundle.total);
                  that.setState({
                      current: 0,
                      count: 0,
                      patient: [],
                  });
                  return bundle;
              })
              .then(function(bundle) {
                  const entry = bundle.entry;
                  //console.log(entry[0].resource.name[0].given[0]);   !!! gives names
                  //const firstname = entry[0].resource.name[0].given[0];
                  //console.log(firstname);
                  let fhirdata = [];
                  entry.map((arr, i) => {
                      fhirdata = fhirdata.concat([{
                          id: entry[i].resource.id,
                          firstName: entry[i].resource.name[0].given[0],
                          lastName: entry[i].resource.name[0].family,
                          gender: entry[i].resource.gender,
                          birthdate: entry[i].resource.birthDate,
                          street: entry[i].resource.address[0].line[0],
                          state: entry[i].resource.address[0].state,
                          city: entry[i].resource.address[0].city,
                          postalCode: entry[i].resource.address[0].postalCode,
                          phones: entry[i].resource.telecom[0].value,
                      }])
                  })
                  //console.log(that.state.patient);
                  //console.log(fhirdata);
                  that.setState({
                      patient: fhirdata,
                      current: fhirdata.length - 1,
                      count: fhirdata.length,
                  })
              })
    }

    //~~~~~~~~~~~~~~~~~~~~~~~


    /**
     * Отображает содержимое в браузере
     *
     * @this {Main}
     * @return {html} код веб-страницы
    */
    render() {
        const update = this.state.createMode ? {display: 'none'} : {};
        const submit = this.state.createMode ? {} : {display: 'none'};
        const patient = this.state.patient;
        const currentPatient = patient[this.state.current];
        if (!this.state.isLoaded) {
            this.getPatients();
            this.setState({isLoaded: true});
        }
        const fhirdata = patient.map((arr, i) => {
            //console.log(arr);
            const firstname = patient[i].firstName;
            const lastname = patient[i].lastName;
            return (<li key={i}>
                <button onClick={() => {this.setState({current: i, createMode: false})}}>
                 {firstname} {lastname}
                </button>
            </li>)
        });
        //console.log(this.state.current);
        console.log(this.state.patient);
        //console.log(this.state.patient[this.state.current].lastName);
        console.log(this.state.lastName);
        return (
                <div>
                    <header>
                        <h1>Medical Card</h1>
                    </header>
                    <div class="layout">
                        <div class="dataframe" id="list">
                            <h2>Patient list</h2>
                            <div>
                                <HashRouter>
                                    <form class="controls">
                                        <div class="searchpane">
                                            <input type="text" class="textfield" id="search" placeholder="Search..."
                                                   value={this.state.searchParam}
                                                   onChange={e => {
                                                       this.setState({searchParam: e.target.value})
                                                   }} />
                                            <input type="button" name="find" class="textfield" id="find" value="Find"
                                                   onClick={() => this.getPatients()} />
                                        </div>
                                        <div>
                                            <input type="button" class="btn" value="New patient" onClick={() => this.createMode()} />
                                        </div>
                                        <div>
                                            <ul>
                                                {fhirdata}
                                            </ul>
                                        </div>
                                        <div class="navpane">
                                            <p>Total count: {this.state.count}</p>
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
                                        <label for="firstName">First name *</label>
                                        <input name="firstName" class="textfield"
                                               value={!this.state.createMode && currentPatient ? currentPatient.firstName : this.state.firstName}
                                               onChange={e => {
                                                   if (this.state.createMode) {
                                                       this.state.firstName = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                                   else {
                                                       currentPatient.firstName = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                               }} />
                                    </div>
                                    <div class="row-info">
                                        <label for="lastName">Last name *</label>
                                        <input name="lastName" class="textfield"
                                               value={!this.state.createMode && currentPatient ? currentPatient.lastName : this.state.lastName}
                                               onChange={e => {
                                                   if (this.state.createMode) {
                                                       this.state.lastName = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                                   else {
                                                       currentPatient.lastName = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                               }} />
                                    </div>
                                    <div class="row-info">
                                        <label for="gender">Gender *</label>
                                        <input name="gender" class="textfield"
                                               value={!this.state.createMode && currentPatient ? currentPatient.gender : this.state.gender}
                                               onChange={e => {
                                                   if (this.state.createMode) {
                                                       this.state.gender = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                                   else {
                                                       currentPatient.gender = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                               }} />
                                    </div>
                                    <div class="row-info">
                                        <label for="birthDate">Birth date *</label>
                                        <input name="birthDate" class="textfield"
                                               value={!this.state.createMode && currentPatient ? currentPatient.birthdate : this.state.birthdate}
                                               onChange={e => {
                                                   if (this.state.createMode) {
                                                       this.state.birthdate = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                                   else {
                                                       currentPatient.birthdate = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                               }} />
                                    </div>
                                    <div class="row-info">
                                        <label for="street">Street *</label>
                                        <input name="street" class="textfield"
                                               value={!this.state.createMode && currentPatient ? currentPatient.street : this.state.street}
                                               onChange={e => {
                                                   if (this.state.createMode) {
                                                       this.state.street = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                                   else {
                                                       currentPatient.street = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                               }} />
                                    </div>
                                    <div class="row-info">
                                        <label for="state">State *</label>
                                        <input name="state" class="textfield"
                                               value={!this.state.createMode && currentPatient ? currentPatient.state : this.state.state}
                                               onChange={e => {
                                                   if (this.state.createMode) {
                                                       this.state.state = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                                   else {
                                                       currentPatient.state = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                               }} />
                                    </div>
                                    <div class="row-info">
                                        <label for="city">City *</label>
                                        <input name="city" class="textfield"
                                               value={!this.state.createMode && currentPatient ? currentPatient.city : this.state.city}
                                               onChange={e => {
                                                   if (this.state.createMode) {
                                                       this.state.city = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                                   else {
                                                       currentPatient.city = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                               }} />
                                    </div>
                                    <div class="row-info">
                                        <label for="postalCode">Postal code *</label>
                                        <input name="postalCode" class="textfield"
                                               value={!this.state.createMode && currentPatient ? currentPatient.postalCode : this.state.postalCode}
                                               onChange={e => {
                                                   if (this.state.createMode) {
                                                       this.state.postalCode = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                                   else {
                                                       currentPatient.postalCode = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                               }} />
                                    </div>
                                    <div class="row-info">
                                        <label for="phones">Phones *</label>
                                        <input name="phones" class="textfield"
                                               value={!this.state.createMode && currentPatient ? currentPatient.phones : this.state.phones}
                                               onChange={e => {
                                                   if (this.state.createMode) {
                                                       this.state.phones = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                                   else {
                                                       currentPatient.phones = e.target.value;
                                                       this.forceUpdate();
                                                   }
                                               }} />
                                    </div>
                                    <div class="buttonpane">
                                        <div style={update}>
                                            <input type="button" name="update" class="btn" value="Update"
                                                   onClick={() => this.updatePatient()} />
                                            <input type="button" name="delete" class="btn" id="del" value="Delete"
                                                   onClick={() => this.deletePatient()} />
                                        </div>
                                        <div style={submit}>
                                            <input type="button" name="submit" class="btn" value="Submit" onClick={() => this.addPatient()} />
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

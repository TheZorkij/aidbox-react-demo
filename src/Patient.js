import React, {Component} from "react";

class Patient extends Component {
    render() {
        return (
            <div>
                <form class="patient-props">
                <div class="row-info">
                    <label for="firstName">First name</label>
                    <input name="firstName" class="textfield" />
                </div>
                <div class="row-info">
                    <label for="lastName">Last name</label>
                    <input name="lastName" class="textfield" />
                </div>
                <div class="row-info">
                    <label for="gender">Gender</label>
                    <input name="gender" class="textfield" />
                </div>
                <div class="row-info">
                    <label for="birthDate">Birth date</label>
                    <input name="birthDate" class="textfield" />
                </div>
                <div class="row-info">
                    <label for="street">Street</label>
                    <input name="street" class="textfield" />
                </div>
                <div class="row-info">
                    <label for="state">State</label>
                    <input name="state" class="textfield" />
                </div>
                <div class="row-info">
                    <label for="city">City</label>
                    <input name="city" class="textfield" />
                </div>
                <div class="row-info">
                    <label for="postalCode">Postal code</label>
                    <input name="postalCode" class="textfield" />
                </div>
                <div class="row-info">
                    <label for="phones">Phones</label>
                    <input name="phones" class="textfield" />
                </div>
                <div class="row-info">
                    <label for="emails">Emails</label>
                    <input name="emails" class="textfield" />
                </div>
                <div class="buttonpane">
                    <input type="button" name="update" class="btn" value="Update" />
                    <input type="button" name="delete" class="btn" id="del" value="Delete" />
                </div>
                </form>
            </div>
        )
    }
}

export default Patient;

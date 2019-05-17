import React, {Component} from "react";
import {
    NavLink
} from "react-router-dom"

class Control extends Component {
    render(){
        return(
            <div>
                <form class="controls">
                    <div class="searchpane">
                        <input type="text" class="textfield" id="search" placeholder="Search..." />
                        <input type="button" name="find" class="textfield" id="find" value="Find" />
                    </div>
                    <div>
                        <input type="button" name="newPatient" class="btn" id="newpatient" value="New patient" />
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

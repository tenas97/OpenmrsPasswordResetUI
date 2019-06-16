/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
class Toast extends React.Component{
    constructor(props) {
        super(props);
        this.showMessage = this.showMessage.bind(this);
        this.state = {
            type: this.props.type,
            success: this.props.success,
            email: this.props.email,
        };
      }

    showMessage() {
        alert("pleasseeeeee")
        switch(this.state.type){
            case "email": 
            alert("zxxcvbnm,,,nbvbnnvnbv");
                switch(this.state.success){
                    case "success": {alert("zxxcvbnm,,,");}return <p>Email sent to {this.state.email}. Follow the underlying instructions to reset your password</p>
                    case "failure": return <p>User with that email does not exist</p>
                }
            case "password":
            switch(this.state.success){
                case "success": return <p>Congratulations, your password has been updated</p>
                case "failure": return <p>Passwords do not match</p>
            }

        }
    }

    render(){
        let flag = ""
        if(this.state.success === "success"){
            return(
                <div><div><FontAwesomeIcon icon={faCheck}/></div>{this.showMessage}</div>
            );
        }else{
            return(
                <div className="toast-item"><div className=".toast-item-image-error"><FontAwesomeIcon icon={faLock}/></div>{this.showMessage}</div>
            );
        }
    }
}

export default Toast;
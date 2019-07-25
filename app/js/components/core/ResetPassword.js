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
import { faUnlock } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import PasswordStrengthMeter from './PasswordStrengthMeter'

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            password: "",
            passwordConfirmation: "",
            error: "",
            activationKey: "",
        };
      }

      componentDidMount() {
        this.setState({
          activationKey: this.props.params.activationKey
        })
     }

  handleSubmit(e){
    e.preventDefault();
    let activationKeyString = this.state.activationKey;
    if(this.state.password === this.state.passwordConfirmation){
      Axios.post(`http://localhost:8080/openmrs/ws/rest/v1/passwordreset/${activationKeyString}`, {newPassword: this.state.password })
      .then(function (response) {
        console.log(response);
      })
    }
  }

  handleChange(e){
    this.setState({
      passwordConfirmation: e.target.value,
    })
  }

  render(){
    let notification;
    let passwordStrength;
    let flag = true;
    let disabled = "";
    if(this.state.password === this.state.passwordConfirmation){
      flag = true;
    }
    else{
       flag = false
       disabled =true;
    }
    if(!flag && this.state.passwordConfirmation){
      notification = <span className='message'><i>(Passwords do not match)</i></span>
    }
    if(this.state.password){
     passwordStrength= <PasswordStrengthMeter password={this.state.password}/>  
    }
    return (
    <div id="body-wrapper">
      <div id="content">
      <form id="password_reset">
        <fieldset>
          <legend>
              <FontAwesomeIcon icon={faUnlock}/> Reset Password
          </legend>
          <p className="left">
          <label>
              Enter Your New Password   
          </label>
            <input
              type="password"
                  placeholder="New Password"
                  value={this.state.password}
                  name="newPassword"
                  onChange={e =>
                      this.setState({
                          password: e.target.value,
                      })
                  }
                  autoFocus
              />
            </p>
            {passwordStrength}
                    
          <p className="left">
          <label>
              Confirm New Password  {notification}
          </label>
            <input
              type="password"
                  placeholder="Confirm Password"
                  value={this.state.passwordConfirmation}
                  name="newPassword"
                  onChange={this.handleChange}
              />
            </p>
        </fieldset>
        <button   
                  onClick={this.handleSubmit}
                  className="confirm"
                  id="passwordResetButton"
                  type="submit"
                  disabled={disabled}
              >
                  Reset Your Password
              </button>
              
          </form>
      </div>
    </div>
  );
}
}

export default ResetPassword;
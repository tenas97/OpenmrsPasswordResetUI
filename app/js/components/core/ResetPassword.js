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
import './PasswordStrengthMeter.css';
import zxcvbn from 'zxcvbn';

class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            password: "",
            passwordConfirmation: "",
            activationKey: "",
            passwordStrengthScore: "",
            disabled: "",
        };
      }

      componentDidMount() {
        this.setState({
          activationKey: this.props.params.activationKey
        })
     }
     createPasswordLabel(){
      const testedResult = zxcvbn(this.state.password); 
      switch (testedResult.score) {
        case 0:
          return 'Weak';
        case 1:
          return 'Weak';
        case 2:
          return 'Fair';
        case 3:
          return 'Good';
        case 4:
          return 'Strong';
        default:
          return 'Weak';
      }
    }

    displayPasswordStrengthMeter(){
      const { password } = this.state;
    const testedResult = zxcvbn(password);
    return (
      <div className="password-strength-meter">
        <progress
          className={`password-strength-meter-progress strength-${this.createPasswordLabel()}`}
          value={testedResult.score}
          max="4"
        />
        <br />
        <label
          className="password-strength-meter-label"
        >
              <strong>Password strength:</strong> {this.createPasswordLabel(testedResult)}
        </label>
      </div>
    );
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

  render(){
    const {password, passwordConfirmation, passwordStrengthScore, disabled} = this.state;
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
                          passwordStrengthScore: zxcvbn(e.target.value).score,
                      })
                  }
                  autoFocus
              />
            </p>
            {password && this.displayPasswordStrengthMeter() }
                    
          <p className="left">
          <label>
              Confirm New Password  {(password !== passwordConfirmation && passwordConfirmation!="") && 
                                       <span className='message'><i>(Passwords do not match)</i></span> }
          </label>
            <input
              type="password"
                  placeholder="Confirm Password"
                  value={this.state.passwordConfirmation}
                  name="newPassword"
                  onChange={e =>
                    this.setState({
                        passwordConfirmation: e.target.value,
                        passwordStrengthScore: zxcvbn(e.target.value).score,
                    }, () =>{if(password !== passwordConfirmation || passwordConfirmation!=""){
                      this.setState({disabled : true})
                    }else{
                      this.setState({disabled : false})
                    }}
                    )
                  }
              />
            </p>
        </fieldset>
        <button   
                  onClick={this.handleSubmit}
                  className="confirm"
                  id="passwordResetButton"
                  type="submit"
                  disabled={disabled && passwordStrengthScore<2 && passwordConfirmation!=""}
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
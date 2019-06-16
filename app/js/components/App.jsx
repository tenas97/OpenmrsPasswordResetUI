/* * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */
import React from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            emailorusername: "",
            message: "",
            error: "",
            validation: ""
        };
      }

      handleSubmit(e) {
        e.preventDefault();
      //   if(this.state.emailorusername){
      //   this.setState({
      //     validation: true
      //   });
      // }
      Axios.post(' http://localhost:8080/openmrs/ws/rest/v1/passwordreset', {usernameOrEmail: this.state.emailorusername})
      .then(function (response) {
        console.log(response);
      })
    }
  render(){
    return (
    <div id="body-wrapper">
      <div id="content">
      {/* <div>
        <Toast email={this.state.emailorusername} type="email" success="success"></Toast>
      </div> */}
      <form id="password_reset">
        <fieldset>
          <legend>
              <FontAwesomeIcon icon={faLock}/> Forgot Password
          </legend>
          <p className="left">
          <label>
              Please Enter Your Username Or Email
          </label>
            <input
              type="email"
                  placeholder="Your email address or Username"
                //   value={this.state.email}
                  name="email/username"
                  onChange={e =>
                      this.setState({
                          emailorusername: e.target.value,
                          message: "",
                          error: "",
                          validation: ""
                      })
                  }
                  autoFocus
              />
            </p>
            <button
                  onClick={this.handleSubmit}
                  className="confirm"
                  id="passwordResetButton"
                  type="submit"
              >
                 Send Password Reset Link
              </button>
              
        </fieldset>
          </form>
      </div>
    </div>
  );
  }
  
}

  export default App;
  


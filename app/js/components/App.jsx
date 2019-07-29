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
import Toast from './core/Toast'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.state = {
            emailorusername: "",
            message: "",
            errorMessage: "",
            validation: false
        };
      }

      handleSubmit(e) {
        e.preventDefault();
      //   if(this.state.emailorusername){
      //   this.setState({
      //     validation: true
      //   });
      // }
      Axios.post(' http://localhost:8080/openmrs/ws/rest/v1/passwordreset', 
      {usernameOrEmail: this.state.emailorusername})
      .then(response => {  
        console.log(response);        
        this.setState(() => ({ errorMessage: false, validation: true}));
      })
    }

    showMessage(){
      if(this.state.errorMessage === false){
        return (<div id="error-message" className="note-container">
        <div className="note success">
            <div className="text">
                <i className="icon-remove medium"></i>
                
                    <p>Email sent to {this.state.emailorusername}. Follow the underlying instructions to reset your password</p>
                
            </div>
            <div className="close-icon"><i className="icon-remove"></i></div>
        </div>
    </div>)
      }
      else if (this.state.errorMessage === true) {
        return(
          <div id="error-message" className="note-container">
                            <div className="note error">
                                <div className="text">
                                    <i className="icon-remove medium"></i>
                                    
                                        <p>User with UserName/Email {this.state.emailorusername} does not exist</p>
                                    
                                </div>
                                <div className="close-icon"><i className="icon-remove"></i></div>
                            </div>
                        </div>
        )
      }
    }
  render(){
    let validation = this.state.validation;
    return (
      <div id="body-wrapper">
      <div id="content">
      {validation ? ( this.showMessage() ) : ('')}
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
                  name="email/username"
                  onChange={e =>
                      this.setState({
                          emailorusername: e.target.value,
                          validation: false
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
                 Reset Password
              </button>
              
        </fieldset>
          </form>
      </div>
    </div>
  );
  }
  
}

  export default App;
  


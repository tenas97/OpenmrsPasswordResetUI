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

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            message: "",
            error: "",
        };
      }
    
  render(){
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
              type="text"
                  placeholder="New Password"
                  value={this.state.password}
                  name="newPassword"
                  onChange={e =>
                      this.setState({
                          emailorusername: e.target.value,
                          message: "",
                          error: ""
                      })
                  }
                  autoFocus
              />
            </p>
            <p className="left">
          <label>
              Confirm New Password
          </label>
            <input
              type="text"
                  placeholder="Confirm Password"
                  value={this.state.password}
                  name="confirmPassword"
                  onChange={e =>
                      this.setState({
                          emailorusername: e.target.value,
                          message: "",
                          error: ""
                      })
                  }
                  autoFocus
              />
            </p>
        </fieldset>
        <button
                  onClick=""
                  className="confirm"
                  id="passwordResetButton"
                  type="submit"
              >
                  Reset Password
              </button>
              
          </form>
      </div>
    </div>
  );
  }
}

export default Home;
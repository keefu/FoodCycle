import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Auth from '../auth';

class UserLogin extends Component {

  handleSubmit = event => {
    event.preventDefault();
    fetch('/api/users/login', {
      method:'POST',
      headers:{ "Content-Type" : "application/json" },
      body: JSON.stringify({ email: event.target.email.value,  password: event.target.password.value })
    })
      .then(function(response) {
        return response.json();
      })
      .then( user_info => {
        localStorage.setItem("token", user_info.token);
        localStorage.setItem("user_id", user_info.user_id);
        localStorage.setItem("username", user_info.username);
        Auth.login(() => {
          this.props.history.push('/deals'); 
        });
      });
  }
  render() {
    return (
    <div>

      <main className="container">
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
          <h2 className="center-align">User login</h2>
          <p className="center-align"><strong>Login as a <a href="/login">Merchant</a></strong></p>          
            <div className="row">
              <div className="input-field col s12">
                <input name="email" id="email" type="email" className="validate"/>
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input name="password" id="pass" type="password" className="validate"/>
                <label htmlFor="pass">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="col m12">
                <p className="right-align">
                  <button className="btn btn-large waves-effect waves-light" type="submit" name="action">Login</button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
    );
  }
}

export default withRouter(UserLogin); 


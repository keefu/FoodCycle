import React, { Component } from 'react';
// import { Redirect } from "react-router-dom";
import Login from "./User_login";
import Loading from  "./Loading";

export class Registration extends Component {

  state = {
    message: '',
    redirect: false,
    userCreated: false,
    isReady: false
  }

handleSubmit = (event) =>{
  event.preventDefault();
    const newUser ={
    firstName: event.target.firstName.value,
    lastName: event.target.lastName.value,
    email: event.target.email.value,
    password: event.target.password.value,
    confirm_password: event.target.confirm_password.value
  }
  const sendUser = async () =>{ 
      const query = await fetch('/api/users/new',{method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })

    if(query.ok){
      let  response  = await query.json()
      this.setState({message: response.message})
      if(response.good){
        this.setState({redirect: true, userCreated: true, message: response.message})
        setTimeout(() => {
          this.setState({isReady: true})
        }, 1000)
      }
    }
    if(query.status === 400){
      let response = await query.json();
      this.setState({message: response.message})
    }
  }
  sendUser()
}

  render() {
    if(this.state.userCreated){
      return   this.state.isReady ? <Login message={this.state.message} /> : <Loading /> ;
    }else{ 
    return (
      <div className="container" style={{marginBottom:50}}>
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <h2 className="center-align">Sign Up</h2>
            <p className="center-align"><strong>Sign up for a <a href="/register">Merchant</a> account here</strong></p>
            <div className="row">
            <p style={{color: 'red'}}>{this.state.message}</p>
              <div className="input-field col s6">
                <input id="first_name" type="text" name="firstName" className="validate"/>
                <label htmlFor="first_name">First Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input id="last_name" name="lastName" type="text" className="validate"/>
                <label htmlFor="last_name">Last Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <input id="email" name="email" type="email" className="validate"/>
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <input placeholder="At least 5 characters" name="password" id="password" type="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12 m6">
                <input id="password-confirm" name="confirm_password" type="password" className="validate"/>
                <label htmlFor="password">Password Confirmation</label>
              </div>
            </div>
            <div className="row">
              <div className="col m12">
                <p className="right-align">
                  <button className="btn btn-large waves-effect waves-light" type="submit" name="action">Sign Up</button>
                </p>
              </div>
            </div>
          </form>
        </div>        
      </div>
    );
    }
  }
}

export default Registration;

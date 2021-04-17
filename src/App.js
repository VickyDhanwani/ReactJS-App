import React from 'react';
import './App.css';
import LoginComponent from './Components/LoginComponent';
import SignUpComponent from './Components/SignUpComponent';


class App extends React.Component {
  state = { isNewUser : false,
    isAuthenticated : false,
    loginPage : true,
    signupPage : false,
    dashboardView : true,
    username : null,
    password : null,
    showCredIncorrectError : false,
    showEmptyFieldError : false,
    showServerErrorEncounteredError : false
  }
  
  switchToSignUp = () => {
    this.setState({loginPage : false, signupPage : true});
  }

  backToLogin = () => {
    this.setState({loginPage : true, signupPage : false});
  }

  updateUsername = (u) => {
    this.setState({username : u});
    console.log(u);
  }

  updatePassword = (p) => {
    this.setState({password: p});
    console.log(p);
  }

  Authenticate = () => {
    let authenticationPackage = {
      username : this.state.username,
      password : this.state.password
    }
    /*{
      method : 'POST',
      body : JSON.stringify(authenticationPackage),
      headers : new Headers({"Content-Type" : "application/json"})
    }*/
    console.log(JSON.stringify(authenticationPackage));
    fetch('http://localhost:8081/v1/OAuth2', {
      method : 'post',
      body : JSON.stringify(authenticationPackage),
      headers : new Headers({ "Content-Type": "application/json" })
    }).then(async response => {
      const res = await response.json();
      if(res.isAuthenticated === true) {
        this.setState({loginPage : false, dashboardView : true ,isAuthenticated : true});
      }
      else {
        this.setState({loginPage : true, dashboardView : false, isAuthenticated : false})
      }
    });
    
  }
  render() {
    if(this.state.loginPage === true) {
      return (
        <div className = 'loginClass'>
          <LoginComponent updatePassword =  {this.updatePassword} updateUsername = {this.updateUsername}/>
          <br/>
          <button type = 'button' name = 'loginbutton' onClick = {this.Authenticate}>LOGIN</button>
          <br/>
          <button type = 'button' name = 'forgotPassword' onClick = {this.switchToSignUp}>New User? Sign Up</button>
        </div>
      );
    }
    else if(this.state.signupPage === true) {
      return (
        <div className = 'signupClass'>
          <SignUpComponent updatePassword = {this.updatePassword} updateUsername = {this.updateUsername} backToLogin = {this.backToLogin} />
          <button type = 'button' name = 'backToLogin' onClick = {this.backToLogin}>Back to Login</button>
        </div>
      );
    }
    else if(this.state.dashboardView === true) {
      return (
        <div className = 'dashboardClass'>
          Dashboard View
          <button type = 'button' name = 'backToLogin' onClick = {this.backToLogin}>LOGOUT</button>
        </div>
      );
    }
  }
}
export default App;

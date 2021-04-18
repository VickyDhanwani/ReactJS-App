import React from 'react';
import './App.css';
import LoginComponent from './Components/LoginComponent';
import SignUpComponent from './Components/SignUpComponent';
import ShowErrorMessage from './Components/ShowErrorMessage';

class App extends React.Component {
  state = { isNewUser : false,
    isAuthenticated : false,
    loginPage : true,
    signupPage : false,
    dashboardView : true,
    username : null,
    password : null,
    showMessage : false,
    displayMessage : null
  }
  
  switchToSignUp = () => {
    this.setState({loginPage : false, signupPage : true, isAuthenticated : false, dashboardView : false});
    this.updateShowMessage(false, null);
  }

  backToLogin = () => {
    this.setState({loginPage : true, signupPage : false, isAuthenticated : false, dashboardView : false});
    this.updateShowMessage(false, null);
  }

  switchToDashboardView = () => {
    this.setState({dashboardView : true, loginPage : false, signupPage : false, isAuthenticated : true});
    this.updateShowMessage(false,null);
  }
  updateUsername = (u) => {
    this.setState({username : u});
    //console.log(u);
  }

  updateShowMessage = (sm, dm) => {
    //console.log(sm, dm);
    this.setState({showMessage : sm});
    if(sm === true) {
      this.setState({displayMessage : dm});
    }

  }
  updatePassword = (p) => {
    this.setState({password: p});
    //console.log(p);
  }

  Authenticate = () => {
    let authenticationPackage = {
      username : this.state.username,
      password : this.state.password
    }
    
    
    fetch('http://localhost:8081/v1/OAuth2', {
      method : 'post',
      body : JSON.stringify(authenticationPackage),
      headers : new Headers({ "Content-Type": "application/json" })
    }).then(async response => {
      const res = await response.json();
      if(res.isAuthenticated === true) {
        this.switchToDashboardView();
      }
      else {
        this.setState({loginPage : true, dashboardView : false, isAuthenticated : false});
        this.updateShowMessage(true, "Error : Cannot Authenticate Credentials, please try again.")
      }
    });
    
  }

  startAuthentication = () => {
    if(this.state.username === null || this.state.username === "") {
      this.updateShowMessage(true, "Error : Please enter username");
    }
    else if(this.state.password === null || this.state.password === "") {
      this.updateShowMessage(true, "Error : Please enter password");
    }
    else {
      this.Authenticate();
    }
  }

  render() {
    if(this.state.loginPage === true) {
      return (
        <div className = 'loginClass'>
          <LoginComponent updatePassword =  {this.updatePassword} updateUsername = {this.updateUsername} updateShowMessage = {this.updateShowMessage}/>
          <br/>
          <button type = 'button' name = 'loginbutton' onClick = {this.startAuthentication}>LOGIN</button>
          <br/>
          <button type = 'button' name = 'forgotPassword' onClick = {this.switchToSignUp}>New User? Sign Up</button>
          <br/>
          <ShowErrorMessage showMessage = {this.state.showMessage} displayMessage = {this.state.displayMessage}/>
        </div>
      );
    }
    else if(this.state.signupPage === true) {
      return (
        <div className = 'signupClass'>
          <SignUpComponent updatePassword = {this.updatePassword} updateUsername = {this.updateUsername} backToLogin = {this.backToLogin} 
            updateShowMessage = {this.updateShowMessage}/>
          <button type = 'button' name = 'backToLogin' onClick = {this.backToLogin}>Back to Login</button>
          <ShowErrorMessage showMessage = {this.state.showMessage} displayMessage = {this.state.displayMessage}/>
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

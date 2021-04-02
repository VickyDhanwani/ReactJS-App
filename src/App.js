import React from 'react';
import './App.css';

class App extends React.Component {
  state = { isNewUser : false,
    isAuthenticated : false,
    loginPage : true,
    signupPage : false,
    dashboardView : true,
    username : null,
    password : null
  }
  
  switchToSignUp = () => {
    this.setState({loginPage : false, signupPage : true});
  }

  backToLogin = () => {
    this.setState({loginPage : true, signupPage : false});
  }

  updateUsername = (e) => {
    this.setState({username : e.target.value});
  }

  updatePassword = (e) => {
    this.setState({password: e.target.value});
  }

  Authenticate = () => {
    this.setState({loginPage : false, dashboardView : true});
  }
  render() {
    if(this.state.loginPage === true) {
      return (
        <div className = 'loginClass'>
          Login Component
          <br/>
          <label>Enter Login :</label>
          <input type = 'text' name = 'username' onChange = {(e) => this.updateUsername(e)}/>
          <br/>
          <label>Enter Password:</label>
          <input type = 'password' name = 'password' onChange = {(e) => this.updatePassword(e)}/>
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
          Sign Up Component
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

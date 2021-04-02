import React from 'react';
import './App.css';



class App extends React.Component {
  state = { isNewUser : false,
    isAuthenticated : false,
    loginPage : true,
    signupPage : false,
    dashboardView : true
  }
  render() {
    return (
      <div className = 'App'>
          <h1 className = 'header'>
            React JS App
          </h1>
      </div>
    );
  }
}
export default App;

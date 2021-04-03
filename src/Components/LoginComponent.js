import React, { Component } from 'react';



class LoginComponent extends React.Component {
    state = { username : null,
              password : null
        }

    updateUsername = (e) => {
        this.setState({username : e.target.value});
        this.props.updateUsername(e.target.value);
    }

    updatePassword = (e) => {
        this.setState({password : e.target.value});
        this.props.updatePassword(e.target.value);
    }

    render() {
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
            </div>
        );
    }
}

export default LoginComponent;
import React from 'react';

class SignUpComponent extends React.Component {
    state = {
        username : null,
        password : null,
        confirmpassword : null
    }

    updateUsername = (e) => {
        this.setState({username : e.target.value});
    }

    updatePassword =(e) => {
        this.setState({password : e.target.value});
    }

    updateConfirmPassword = (e) => {
        this.setState({confirmpassword : e.target.value});
    }

    submitForm = () => {
        if(this.state.password === this.state.confirmpassword) {
            console.log('Password Match');
        }
        else {
            console.log('Password Mismatch');
        }
        this.props.updateUsername(this.state.username);
        this.props.updatePassword(this.state.password);
        this.props.backToLogin();
    }
    render() {
        return(
            <div className = 'signupClass'>
                <form name = 'signupForm'>
                    <label>Username : </label>
                    <input type = 'text' className = 'username' onChange = {this.updateUsername}/>
                    <br />
                    <label>Password : </label>
                    <input type = 'password' className = 'password' onChange = {this.updatePassword}/>
                    <br/>
                    <label>Confirm Password :</label>
                    <input type = 'confirmpassword' className = 'confirmpassword' onChange = {this.updateConfirmPassword}/>
                    <br />
                    <button type = 'button' className = 'SubmitButtons' onClick = {this.submitForm}>Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignUpComponent;


import React from 'react';

class SignUpComponent extends React.Component {
    state = {
        username : null,
        password : null,
        confirmpassword : null,
        useradded : false
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

    addThisUser = (u, p) => {
        let payload = {
            username : u,
            password : p
        };
        fetch('http://localhost:8081/v1/_api/addUser', {
            method : 'post',
            body : JSON.stringify(payload),
            headers : new Headers({'Content-Type' : 'application/json'})
        }).then(
            async response => {
                const res = await response.json();
                console.log(res);
                if(res.useradded) {
                    this.setState({useradded : true});
                    this.props.updateShowMessage(false, "");
                    this.props.backToLogin();
                }
                else {
                    this.setState({useradded : false});
                    this.props.updateShowMessage(true, res.responseMessage);
                }
            }
        );
    }

    submitForm = () => {
        if(this.state.username === null || this.state.password === null || this.state.confirmpassword === null) {
            this.props.updateShowMessage(true, "Error : Username, Password and Confirm Password fields are mandatory");
        }
        else if(this.state.password === this.state.confirmpassword) {
            this.props.updateUsername(this.state.username);
            this.props.updatePassword(this.state.password);
            this.addThisUser(this.state.username, this.state.password);
        }
        else if(this.state.password !== this.state.confirmpassword){
            this.props.updateShowMessage(true, "Passwords Mismatch ! Enter same passswords.");
        }
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
                    <input type = 'password' className = 'confirmpassword' onChange = {this.updateConfirmPassword}/>
                    <br />
                    <button type = 'button' className = 'SubmitButtons' onClick = {this.submitForm}>Sign Up</button>
                </form>
            </div>
        );
    }
}

export default SignUpComponent;


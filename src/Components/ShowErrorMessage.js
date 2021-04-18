import React from 'react';

class ShowErrorMessage extends React.Component {
    render() {
        if(this.props.showMessage) {
            return(
                <div className = "errorMessage">
                    {this.props.displayMessage}
                </div>
            );
        }
        else {
            return(
                <div className = "errormessage"></div>
            );
        }
    }
}

export default ShowErrorMessage;
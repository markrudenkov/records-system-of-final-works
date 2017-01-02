'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const bStyle = require('../scss/_buttons.scss');
const fStyle = require('../scss/_forms.scss');

class Login extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        console.log('button clicked!');
        event.preventDefault();
    }

    render() {
        //const {title} = this.props;
        console.log(fStyle);
        return (
            <form className={fStyle.form}>
                <div className={fStyle.formRow}>
                    <label><b>Username</b></label>
                    <input type='text' placeholder='Enter Username' name='uname'> </input>
                </div>
                <div className={fStyle.formRow}>
                    <label><b>Password</b></label>
                    <input type='password' placeholder='Enter Password' name='psw'> </input>
                </div>
                <button className={`${bStyle.buttonSuccess} ${fStyle.button}`} onClick={this.onClick}>Login</button>
            </form>
        );
    }
}

// Login.propTypes = {
//     title: PropTypes.string.isRequired,
// };


module.exports = Login;
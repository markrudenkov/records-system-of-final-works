'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const bStyle = require('../scss/_buttons.scss');
const fStyle = require('../scss/_forms.scss');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { userLoginClick } = require('../actions/userActions');
const { showNotification } = require('../actions/notificationActions');

class Login extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    componentWillMount() {
        if (this.props.userIsLoggedIn) {
            this.props.router.push('/');
        }
    }

    validate(name, pass) {
        let errorText = '';

        if (name === '' || pass === '') {
            errorText += '[Validation Error] -> Empty fields restricted';
        } else if (name.length < 3) {
            errorText += '[Validation Error] -> Username has to be longer than 3 characters';
        } else if (pass.length < 3) {
            errorText += '[Validation Error] -> Password has to be longer than 3 characters';
        }

        if (errorText === '') {
            return true;
        } else {
            this.props.showNotification(errorText, 'danger');
            return false;
        }
    }

    onClick(event) {
        event.preventDefault();

        const username = this.refs.username.value;
        const password = this.refs.password.value;

        if (!this.validate(username, password)) {
            return;
        }
        const user = {
            username,
            password
        };
        //emit login
        this.props.userLoginClick(user);
    }

    render() {
        return (
            <form className={fStyle.form}>
                <div className={fStyle.formRow}>
                    <label><b>Username</b></label>
                    <input type='text' placeholder='Enter Username' ref='username' />
                </div>
                <div className={fStyle.formRow}>
                    <label><b>Password</b></label>
                    <input type='password' placeholder='Enter Password' ref='password' />
                </div>
                <button className={`${bStyle.buttonSuccess} ${fStyle.button}`} onClick={this.onClick}>Login</button>
            </form>
        );
    }
}

// Login.propTypes = {
//     title: PropTypes.string.isRequired,
// };

function mapStateToProps(state) {
    return {
        userIsLoggedIn: state.session.user.isLoggedIn
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        userLoginClick: userLoginClick,
        showNotification: showNotification
    }, dispatch);
}


module.exports = connect(mapStateToProps,matchDispatchToProps)(Login);
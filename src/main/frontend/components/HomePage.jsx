'use strict';

const React = require('react');
const {Component, PropTypes} = React;

const style = require('../scss/main.scss');
const styleButtons = require('../scss/_buttons.scss');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.loggedIn = this.loggedIn.bind(this);
        this.notloggedIn = this.notloggedIn.bind(this);

        this.state = {showModal: false};
    }

    loggedIn() {
        return (
            <div className={style.row}>
                <h1>You are loggedin as {this.props.username} [{this.props.permission}]</h1>
            </div>
        );
    }

    notloggedIn() {
        return (
            <div className={style.row}>
                <h1>Welcome to UWB app! Pleace login for access</h1>
            </div>
        );
    }

    render() {
        let screen = this.props.userIsLoggedIn ? this.loggedIn() : this.notloggedIn();

        return (
            <div className={style.center}>
                {screen}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userIsLoggedIn: state.session.user.isLoggedIn,
        username: state.session.user.username,
        permission: state.session.user.permission,
    }
}

module.exports = connect(mapStateToProps)(HomePage);
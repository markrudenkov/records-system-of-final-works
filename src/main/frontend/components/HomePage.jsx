'use strict';

const React = require('react');
const {Component, PropTypes} = React;
//const Login = require('Login');
const style = require('../scss/main.scss');
const styleButtons = require('../scss/_buttons.scss');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { toggleNotification, hideNotification, showNotification } = require('../actions/notificationActions');


class HomePage extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        //this.props.router.push('login');
        this.props.toggleNotification();
    }

    render() {
        //const {title} = this.props;

        return (
            <div className={`${style.row} ${style.center}`}>
                <button className={styleButtons.buttonSuccess} onClick={this.onClick}>Notification is hidden: {`${this.props.hidden}`}</button>
                <button className={styleButtons.buttonInfo} onClick={() => {this.props.showNotification('Info message', 'info')}}>Show info!</button>
                <button className={styleButtons.buttonSuccess} onClick={() => {this.props.showNotification('Success message', 'success')}}>Show success!</button>
                <button className={styleButtons.buttonDanger} onClick={() => {this.props.showNotification('Danger message', 'danger')}}>Show danger!</button>
                <button className={styleButtons.buttonSuccess} onClick={() => {this.props.hideNotification()}}>Hide notification</button>
            </div>
        );
    }
}

HomePage.propTypes = {
    title: PropTypes.string,
};


function mapStateToProps(state) {
    return {
        hidden: state.communication.notification.hidden
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleNotification: toggleNotification,
        showNotification: showNotification,
        hideNotification: hideNotification,
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(HomePage);
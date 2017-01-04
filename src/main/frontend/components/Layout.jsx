'use strict';

const React = require('react');
const Navigation = require('./Navigation');
const Notification = require('./Notification');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

class Layout extends React.Component {
    render() {
        const {color, message, hidden} = this.props.notification;
        return (
            <div>
                <Navigation />
                <Notification color={color} message={message} hidden={hidden} />
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        notification: state.communication.notification
    }
}



module.exports = connect(mapStateToProps)(Layout);
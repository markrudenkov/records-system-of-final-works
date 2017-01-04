'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const style = require('../scss/_notifications.scss');
const mainStyle = require('../scss/main.scss');

class Notification extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {color, message, hidden} = this.props;
        if (hidden) {
            return null;
        }

        return (
            <div className={`${style[color]} ${mainStyle.center}`}>
                {message}
            </div>
        );
    }
}

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    hidden: PropTypes.bool,
    color: PropTypes.string,
};

Notification.defaultProps = {
    hidden: true,
    color: 'info'
};

module.exports = Notification;
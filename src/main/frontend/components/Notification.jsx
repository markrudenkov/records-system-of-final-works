'use strict';

const React = require('react');
const {Component, PropTypes, DefaultPropTypes} = React;
const style = require('../scss/_notifications.scss');
const mainStyle = require('../scss/main.scss');

class Notification extends Component {

    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this);
        this.state = {hidden: false, timer: 5};
    }

    tick() {
        if (this.state.timer > 0) {
            this.setState((prevState) => ({
              timer: prevState.timer - 1
            }));
        } else {
            clearInterval(this.interval);
            this.setState({hidden: true, timer: 5});
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    render() {
        const {success, message, hidden} = this.props;
        if (this.state.hidden) {
            return null;
        }
        const look = style.success;//success ? style.success : style.warning;

        return (
            <div className={`${look} ${mainStyle.center}`}>
                {message+' '+this.state.timer}
            </div>
        );
    }
}

Notification.propTypes = {
    success: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    hidden: PropTypes.bool,
};

module.exports = Notification;
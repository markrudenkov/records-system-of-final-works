'use strict';

const React = require('react');
const Navigation = require('Navigation');
const Notification = require('./Notification');

class Layout extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                <Notification success={true} message={'Wait for it!'} />
                {this.props.children}
            </div>
        );
    }
}

module.exports = Layout;
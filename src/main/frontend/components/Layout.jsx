'use strict';

const React = require('react');
const Navigation = require('Navigation');
//const Footer = require('./Footer');

class Layout extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                {this.props.children}
            </div>
        );
    }
}

module.exports = Layout;
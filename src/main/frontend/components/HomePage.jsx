'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const Login = require('Login');
//const style = require('../scss/test.scss');

class HomePage extends Component {

    render() {
        const {title} = this.props;

        return (
            <div>
                <p >HOME PAGE Component {title}</p>
                <Login />
            </div>
        );
    }
}

HomePage.propTypes = {
    title: PropTypes.string.isRequired,
};


module.exports = HomePage;
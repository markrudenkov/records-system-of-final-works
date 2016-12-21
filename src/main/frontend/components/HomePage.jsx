'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const style = require('../scss/test.scss');

class HomePage extends Component {

    render() {
        const {title} = this.props;

        return (
            <div className={style.wrapper}>
                <p className={style.inner} >HOME PAGE Component {title}</p>
                <ul>
                    <li>Hello</li>
                    <li>World</li>
                </ul>
            </div>
        );
    }
}

HomePage.propTypes = {
    title: PropTypes.string.isRequired,
};


module.exports = HomePage;
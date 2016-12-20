'use strict';

const React = require('react');
const {Component, PropTypes} = React;

class HomePage extends Component {

    render() {
        const {title} = this.props;
        //console.log(title);

        return (
            <div>
                <p>HOME PAGE Component {title}</p>
            </div>
        );
    }
}

HomePage.propTypes = {
    title: PropTypes.string.isRequired,
};


module.exports = HomePage;

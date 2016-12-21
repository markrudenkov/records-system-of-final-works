'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const style = require('../scss/navigation.scss');

class Navigation extends Component {

    render() {

        const array = ['UWB final works', 'Home', 'About', 'Blog', 'Bacom'];
        return (
            <ul className={style.nav}>
                {array.map(title => {
                        return <li className={style.listItem}><a href='#'>{title}</a></li>
                })}

            </ul>
        );
    }
}

// Navigation.propTypes = {
//     title: PropTypes.string.isRequired,
// };


module.exports = Navigation;

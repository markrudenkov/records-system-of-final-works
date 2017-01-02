'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const style = require('../scss/navigation.scss');

class Navigation extends Component {

    render() {

        const array = ['UWB final works', 'Home', 'About', 'Blog', 'Bacone'];
        return (
            <ul className={style.nav}>
                {array.map(title => {
                    let look = style.listItem;
                    if (title === 'Bacone')  look = style.specialItem;
                    return <li key={title} className={look}><a href='#'>{title}</a></li>
                })}
            </ul>
        );
    }
}

// Navigation.propTypes = {
//     title: PropTypes.string.isRequired,
// };


module.exports = Navigation;

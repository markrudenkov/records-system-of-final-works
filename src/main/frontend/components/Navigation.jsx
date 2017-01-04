'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const {Link} = require('react-router');

const style = require('../scss/navigation.scss');

class Navigation extends Component {

    render() {

        const locations = [
            {
                title: 'UWB final works',
                url: '/'
            },
            {
                title: 'About',
                url: 'about'
            },
            {
                title: 'Login',
                url: 'login'
            },
        ];
        return (
            <ul className={style.nav}>
                {locations.map(location => {
                    let look = style.listItem;
                    if (location.url === 'login')  look = style.specialItem;
                    return <li key={location.title} className={look}><Link to={location.url}>{location.title}</Link></li>
                })}
            </ul>
        );
    }
}

// Navigation.propTypes = {
//     title: PropTypes.string.isRequired,
// };


module.exports = Navigation;

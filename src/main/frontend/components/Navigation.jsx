'use strict';

const React = require('react');
const {Component, PropTypes} = React;

class HomePage extends Component {

    render() {
        return (
            <div>
                <ul className='top-nav'>
                    <li className='item'>
                        <a href='#' className='logo'>
                            <i className='fa fa-bars'></i> UWB final works
                        </a>
                    </li>
                    <li className='item'><a href='#'>Home</a></li>
                    <li className='item'><a href='#'>About</a></li>
                    <li className='item'><a href='#'>Blog</a></li>
                    <li className='item'><a href='#'>Bacon</a></li>
                </ul>
            </div>
        );
    }
}

HomePage.propTypes = {
    title: PropTypes.string.isRequired,
};


module.exports = HomePage;

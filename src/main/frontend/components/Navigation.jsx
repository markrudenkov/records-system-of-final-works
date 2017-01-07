'use strict';

const React = require('react');
const { Component } = React;
const { Link } = require('react-router');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const style = require('../scss/navigation.scss');

class Navigation extends Component {
    render() {
        const { locations } = this.props;
        return (
            <ul className={style.nav}>
                {locations.map(location => {
                    let look = location.alignRight ? style.specialItem : style.listItem;
                    return <li key={location.title} className={look}><Link onClick={(e)=>{console.log('you clicked '+location.title);}} to={location.url}>{location.title}</Link></li>
                })}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        locations: state.communication.navigation.links
    }
}

module.exports = connect(mapStateToProps)(Navigation);

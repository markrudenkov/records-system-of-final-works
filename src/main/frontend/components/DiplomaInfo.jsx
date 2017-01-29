'use strict';

const React = require('react');
const { Component } = require('react');
const style = require('../scss/main.scss');

class DiplomaInfo extends Component {

    render() {
        const { title, annotation, promotor, recenzent } = this.props;
        return (
            <div className={`${style.row} ${style.center}`}>
                <h2><b>Title:</b> {title}</h2>
                <p><b>Description:</b> {annotation}</p>
                <p><b>Promotor:</b> {`${promotor.title} ${promotor.name} ${promotor.surname}`}</p>
                <p><b>Recenzent:</b> {`${recenzent.title} ${recenzent.name} ${recenzent.surname}`}</p>
            </div>
        );
    }
}



module.exports = DiplomaInfo;
'use strict';

const React = require('react');
const { Component } = require('react');
const style = require('../scss/modal.scss');

class Modal extends Component {

    render() {
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        return (
            <div className={`${style.modal} ${style.modalContent}`}>
                <span className={style.close}>&times;</span>
                {this.props.children}
            </div>
        );
    }
}



module.exports = Modal;
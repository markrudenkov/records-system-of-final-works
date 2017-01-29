'use strict';

const React = require('react');
const { Component } = require('react');
const style = require('../scss/modal.scss');

class Modal extends Component {

    constructor(props) {
        super(props);
        this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
        this.close = this.close.bind(this);
    }

    close() {
        this.props.onHide();
    }

    handleBackgroundClick(e) {
        if (e.target === e.currentTarget) {
            this.close();
        }
    };

    render() {
        return this.props.show ? (
            <div onClick={this.handleBackgroundClick} className={style.modal}>
                <div className={style.modalContent}>
                    <span onClick={this.close} className={style.close}>&times;</span>
                    {this.props.children}
                </div>
            </div>
        ) : null;
    }
}

module.exports = Modal;
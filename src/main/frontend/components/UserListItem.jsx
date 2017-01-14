'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const DynamicForm = require('DynamicForm');
const style = require('../scss/main.scss');
const styleButtons = require('../scss/_buttons.scss');
const styleListItem = require('../scss/userListItem.scss');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { toggleNotification } = require('../actions/notificationActions');


class UserListItem extends Component {

    constructor(props) {
        super(props);
        this.mode = this.mode.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.deleteClick = this.deleteClick.bind(this);
        this.switchMode = this.switchMode.bind(this);
        this.state = {showForm: false};
    }

    saveClick(data) {
        console.log('save data!');
    }

    deleteClick(data) {
        console.log('delete data!');
    }

    switchMode() {
        this.setState({showForm: !this.state.showForm});
    }

    mode() {
        const { name, surname, id, userForm, endPointURL } = this.props;

        if (this.state.showForm) {
            return (
                <div>
                    <DynamicForm formData={userForm} legend={'Edit user'} buttonLabel={'Save'} onClick={this.saveClick} />
                    <button className={styleButtons.buttonPrimary} onClick={this.switchMode}>Cancel</button>
                </div>
            );
        } else {
            return (
                <div className={styleListItem.wrapper}>
                    <p className={styleListItem.itemText}>{name}</p>
                    <p className={styleListItem.itemText}>{surname}</p>
                    <button className={`${styleButtons.buttonPrimary} ${styleListItem.editButton}`} onClick={this.switchMode}>Edit</button>
                    <button className={styleButtons.buttonDanger}>Delete</button>
                </div>
            );
        }
    }

    render() {
        const { name, surname, id, userForm, endPointURL } = this.props;
        return (
            <div className={style.center}>
                {this.mode()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        hidden: state.communication.notification.hidden
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleNotification: toggleNotification,
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(UserListItem);
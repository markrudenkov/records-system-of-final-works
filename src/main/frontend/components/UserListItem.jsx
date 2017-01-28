'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const DynamicListForm = require('DynamicListForm');
const style = require('../scss/main.scss');
const styleButtons = require('../scss/_buttons.scss');
const styleListItem = require('../scss/userListItem.scss');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { deleteUser, updateUser } = require('../actions/apiActions');

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
        this.props.updateUser(this.props.url, data);
        this.setState({showForm: false});
    }

    deleteClick() {
        this.props.deleteUser(this.props.url, this.props.user.id);
    }

    switchMode(e) {
        e.preventDefault();
        this.setState({showForm: !this.state.showForm});
    }

    mode() {
        const { user, userForm } = this.props;

        if (this.state.showForm) {
            return (
                <div className={styleListItem.formWrapper}>
                    <DynamicListForm user={user} formData={userForm} legend={`Edit ${user.name} ${user.surname}`} buttonLabel={'Save'} onClick={this.saveClick} cancelClick={this.switchMode} />
                </div>
            );
        } else {
            return (
                <div className={styleListItem.wrapper}>
                    <p className={styleListItem.itemText}>{user.id}</p>
                    <p className={styleListItem.itemText}>{user.username}</p>
                    <p className={styleListItem.itemText}>{user.name}</p>
                    <p className={styleListItem.itemText}>{user.surname}</p>
                    <button className={`${styleButtons.buttonPrimary} ${styleListItem.editButton}`} onClick={this.switchMode}>Edit</button>
                    <button className={styleButtons.buttonDanger} onClick={this.deleteClick}>Delete</button>
                </div>
            );
        }
    }

    render() {
        return (
            <div className={style.center}>
                {this.mode()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteUser: deleteUser,
        updateUser: updateUser
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(UserListItem);
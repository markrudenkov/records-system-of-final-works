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
                <tr><td>
                    <div className={style.center}>
                    <DynamicListForm user={user} formData={userForm} legend={`Edit ${user.name} ${user.surname}`} buttonLabel={'Save'} onClick={this.saveClick} cancelClick={this.switchMode} />
                    </div>
                </td></tr>
            );
        } else {
            return (
                <tr>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>
                        <button className={`${styleButtons.buttonPrimary} ${styleListItem.editButton}`} onClick={this.switchMode}>Edit</button>
                        <button className={styleButtons.buttonDanger} onClick={this.deleteClick}>Delete</button>
                    </td>
                </tr>
            );
        }
    }

    render() {
        return this.mode();
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
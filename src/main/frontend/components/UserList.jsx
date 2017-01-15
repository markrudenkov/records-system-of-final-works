'use strict';

const React = require('react');

const UserListItem = require('UserListItem');
const Switch = require('./Switch');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { registerAcademic, registerStudent } = require('../actions/adminActions');

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.switchOnChange = this.switchOnChange.bind(this);

        this.state = {isStudentOn: true};
    }

    componentWillMount() {
        //console.log('load students!!!');
    }

    switchOnChange(state) {
        this.setState({isStudentOn: state});
        if (state) {
            //console.log('load students!!!');
        } else {
            //console.log('load academics!!!');
        }
    }

    render() {
        const { studentFormData, academicFormData, students, academics } = this.props;
        const { isStudentOn } = this.state;

        const formData = isStudentOn ? studentFormData : academicFormData;
        const list = isStudentOn ? students : academics;
        const endPointURL = isStudentOn ? 'api/admin/student' : 'api/admin/academic';

        return (
            <div>
                <Switch switchChange={this.switchOnChange}/>
                {
                    list.map((user) => {
                        return (
                            <UserListItem key={user.id} userForm={formData} name={user.name} surname={user.surname} id={user.id} endPointURL={endPointURL} />
                        )
                    })
                }

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        students: state.data.users.students,
        academics: state.data.users.academics,
        academicFormData: state.control.forms.academicListFormData,
        studentFormData: state.control.forms.studentListFormData,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        registerAcademic: registerAcademic,
        registerStudent: registerStudent
    }, dispatch);
}


module.exports = connect(mapStateToProps, matchDispatchToProps)(UserList);
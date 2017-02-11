'use strict';

const React = require('react');

const style = require('../scss/main.scss');

const UserListItem = require('UserListItem');
const Switch = require('./Switch');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { getAcademics, getStudents } = require('../actions/apiActions');

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.switchOnChange = this.switchOnChange.bind(this);

        this.state = {isStudentOn: true};
    }

    componentWillMount() {
        this.props.getStudents();
    }

    switchOnChange(state) {
        this.setState({isStudentOn: state});
        if (state) {
            this.props.getStudents();
        } else {
            this.props.getAcademics();
        }
    }

    render() {
        const { studentFormData, academicFormData, students, academics } = this.props;
        const { isStudentOn } = this.state;

        const formData = isStudentOn ? studentFormData : academicFormData;
        const list = isStudentOn ? students : academics;
        const url = isStudentOn ? 'student' : 'academic';

        return (
            <div>
                <Switch switchChange={this.switchOnChange}/>
                <table className={style.table}>
                <tbody>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Options</th>
                    </tr>
                    {list.map((user) => {
                        return (
                            <UserListItem key={user.id} userForm={formData} user={user} url={url} />
                        )
                    })}
                </tbody>
                </table>
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
        getAcademics: getAcademics,
        getStudents: getStudents
    }, dispatch);
}


module.exports = connect(mapStateToProps, matchDispatchToProps)(UserList);
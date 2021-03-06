'use strict';

const React = require('react');

const DynamicForm = require('./DynamicForm');
const Switch = require('./Switch');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { registerAcademic, registerStudent } = require('../actions/adminActions');

class RegisterUser extends React.Component {

    constructor(props) {
        super(props);
        this.switchOnChange = this.switchOnChange.bind(this);
        this.registerClick = this.registerClick.bind(this);

        this.state = {isStudentOn: true};
    }

    switchOnChange(state) {
        this.setState({isStudentOn: !this.state.isStudentOn});
    }

    registerClick(data) {
        if (this.state.isStudentOn) {
            this.props.registerStudent(data);
        } else {
            this.props.registerAcademic(data);
        }
    }

    render() {
        const { studentForm, academicForm } = this.props;
        const { isStudentOn } = this.state;

        const legend = isStudentOn ? studentForm.legend : academicForm.legend;
        const buttonLabel = isStudentOn ? studentForm.buttonLabel : academicForm.buttonLabel;
        const formData = isStudentOn ? studentForm.formData : academicForm.formData;

        return (
            <div>
                <Switch switchChange={this.switchOnChange}/>
                <DynamicForm legend={legend} formData={formData} onClick={this.registerClick} buttonLabel={buttonLabel} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        studentForm: state.control.forms.studentForm,
        academicForm: state.control.forms.academicForm,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        registerAcademic: registerAcademic,
        registerStudent: registerStudent
    }, dispatch);
}


module.exports = connect(mapStateToProps, matchDispatchToProps)(RegisterUser);
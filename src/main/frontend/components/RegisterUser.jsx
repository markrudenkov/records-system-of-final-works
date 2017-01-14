'use strict';

const React = require('react');
const DynamicForm = require('./DynamicForm');
const style = require('../scss/switch.scss');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { hideNotification } = require('../actions/notificationActions');
const { registerAcademic, registerStudent } = require('../actions/adminActions');

class RegisterUser extends React.Component {

    constructor(props) {
        super(props);
        this.switchOnChange = this.switchOnChange.bind(this);
        this.registerClick = this.registerClick.bind(this);

        this.state = {isStudentOn: true};
    }

    switchOnChange(isStudentClick) {
        if ( (this.state.isStudentOn && !isStudentClick) || (!this.state.isStudentOn && isStudentClick) ) { // XOR
            this.setState({isStudentOn: !this.state.isStudentOn});
        }
    }

    registerClick(data) {
        if (this.state.isStudentOn) {
            this.props.registerStudent(data);
        } else {
            this.props.registerAcademic(data)
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
                <div className={style.switch}>
                    <input onChange={()=>{this.switchOnChange(true)}} type='radio' className={style.switchInput} name='view' value='student' id='student' />
                    <label htmlFor='student' className={`${style.switchLabel} ${style.switchLabelOff}`}>Student</label>
                    <input onChange={()=>{this.switchOnChange(false)}} type='radio' className={style.switchInput} name='view' value='academic' id='academic' />
                    <label htmlFor='academic' className={`${style.switchLabel} ${style.switchLabelOn}`}>Academic</label>
                    <span className={style.switchSelection}></span>
                </div>

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
        hideNotification: hideNotification,
        registerAcademic: registerAcademic,
        registerStudent: registerStudent
    }, dispatch);
}


module.exports = connect(mapStateToProps, matchDispatchToProps)(RegisterUser);
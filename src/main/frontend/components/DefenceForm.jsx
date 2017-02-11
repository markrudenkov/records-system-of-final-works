'use strict';

const React = require('react');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { showNotification } = require('../actions/notificationActions');
const { getAcademics } = require('../actions/apiActions');

const bStyle = require('../scss/_buttons.scss');
const fStyle = require('../scss/_forms.scss');

class DefenceForm extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    componentWillMount() {
        this.props.getAcademics();
    }

    validateForm(refs) {
        let date = refs.date.value;

        if (date.length < 3) {
            this.props.showNotification('Date must be longer than 3 symbols', 'danger');
            return false;
        }
        return true;
    }

    onClick(event) {
        event.preventDefault();
        if (!this.validateForm(this.refs)) {
            return;
        }
        let date = this.refs.date.value;
        let chairmanId = this.refs.chairman.value;
        let data = {
            date,
            chairmanId,
        };

        this.props.onClick(data);
    }

    render() {
        const { academics } = this.props;
        return (
            <form className={fStyle.form}>
                <legend><h3>Create defense</h3></legend>
                <div className={fStyle.formRow}>
                    <label><b>Date</b></label>
                    <input className={fStyle.inputStyle} ref='date' placeholder='Date' />
                </div>
                <div className={fStyle.formRow}>
                    <label><b>Chairman</b></label>
                    <select ref='chairman' className={fStyle.inputStyle}>
                        {academics.map((rec)=>{
                            return <option key={rec.id} value={rec.id}>{`${rec.title} ${rec.name} ${rec.surname}`}</option>
                        })}
                    </select>
                </div>
                <button className={`${bStyle.buttonSuccess} ${fStyle.button}`} onClick={this.onClick}>Create defense</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        academics: state.data.users.academics
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotification: showNotification,
        getAcademics: getAcademics,
    }, dispatch);
}


module.exports = connect(mapStateToProps, matchDispatchToProps)(DefenceForm);
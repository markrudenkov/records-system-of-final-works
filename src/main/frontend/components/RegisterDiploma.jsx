'use strict';

const React = require('react');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { showNotification } = require('../actions/notificationActions');
const { getAcademics } = require('../actions/apiActions');

const bStyle = require('../scss/_buttons.scss');
const fStyle = require('../scss/_forms.scss');

class RegisterDiploma extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    componentWillMount() {
        this.props.getAcademics();
    }

    validateForm(refs) {
        let title = refs.title.value;
        let description = refs.description.value;

        if (title.length < 3) {
            this.props.showNotification('Title must be longer than 3 symbols', 'danger');
            return false;
        }
        if (description.length < 3) {
            this.props.showNotification('Description must be longer than 3 symbols', 'danger');
            return false;
        }
        return true;
    }

    onClick(event) {
        event.preventDefault();
        if (!this.validateForm(this.refs)) {
            return;
        }
        let title = this.refs.title.value;
        let description = this.refs.description.value;
        let recenzent = this.refs.recenzent.value;
        let data = {
            title,
            description,
            recenzent
        };
        this.refs.title.value = '';
        this.refs.description.value = '';
        console.log('Send '+JSON.stringify(data));
    }

    render() {
        const { recenzents, username } = this.props;
        return (
            <form className={fStyle.form}>
                <legend><h3>Register new Diploma work</h3></legend>
                <div className={fStyle.formRow}>
                    <label><b>Title</b></label>
                    <textarea ref='title' placeholder='Title'></textarea>
                </div>
                <div className={fStyle.formRow}>
                    <label><b>Description</b></label>
                    <textarea ref='description' placeholder='Description'></textarea>
                </div>
                <div className={fStyle.formRow}>
                    <label><b>Recenzent</b></label>
                    <select ref='recenzent' className={fStyle.inputStyle}>
                        {
                            recenzents.map((rec)=>{
                                if (username !== rec.username)
                                    return <option key={rec.id} value={rec.id}>{`${rec.title} ${rec.name} ${rec.surname}`}</option>
                            })
                        }
                    </select>
                </div>
                <button className={`${bStyle.buttonSuccess} ${fStyle.button}`} onClick={this.onClick}>Save</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        recenzents: state.data.users.academics,
        username: state.session.user.username
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        showNotification: showNotification,
        getAcademics: getAcademics
    }, dispatch);
}


module.exports = connect(mapStateToProps, matchDispatchToProps)(RegisterDiploma);
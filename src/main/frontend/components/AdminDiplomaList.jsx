'use strict';

const React = require('react');
const {Component, PropTypes} = React;

const DefenceForm = require('./DefenceForm');
const Modal = require('./Modal');

const style = require('../scss/main.scss');
const styleButtons = require('../scss/_buttons.scss');
const styleListItem = require('../scss/userListItem.scss');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { declineDiploma, confirmDiploma, getDiplomas, createDefense } = require('../actions/adminActions');

class AdminDiplomaList extends Component {

    constructor(props) {
        super(props);
        this.createDefense = this.createDefense.bind(this);
        this.sendDefense = this.sendDefense.bind(this);
        this.state = {showModal: false, currentDiploma: {}};
    }

    componentWillMount() {
        this.props.getDiplomas();
    }

    createDefense(diplomaId) {
        this.setState({currentDiploma: diplomaId, showModal: true});
    }
    sendDefense(data) {
        data.finalWorkId = this.state.currentDiploma;
        console.log(data);
        this.props.createDefense(data);
        this.setState({showModal: false});
    }

    render() {
        const { diplomas } = this.props;
        return (
            <div className={style.center}>
                <h2>Diploma list</h2>
                <table className={style.table}>
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Student</th>
                        <th>Promotor</th>
                        <th>Reviewer</th>
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                    {diplomas.map((dip) => {
                        let buttons;
                        if (dip.status === 'REGISTERED') {
                            buttons = ( <td>
                                <button className={`${styleButtons.buttonSuccess} ${styleListItem.editButton}`} onClick={() => {this.props.confirmDiploma(dip.id)}}>Confirm</button>
                                <button className={styleButtons.buttonDanger} onClick={() => {this.props.declineDiploma(dip.id)}}>Decline</button>
                            </td>);
                        } else if (dip.status === 'FOR_DEFENCE' && !dip.defenceExists) {
                            buttons = ( <td>
                                <button className={styleButtons.buttonSuccess} onClick={() => {this.createDefense(dip.id)}}>Create defense</button>
                            </td>);
                        } else {
                            buttons = <td>(no options)</td>
                        }
                        const { promotor, reviever, student } = dip;
                        let studentName = student ? `${student.name} ${student.surname}` : '';
                        return (
                            <tr key={dip.id}>
                                <td>{dip.title}</td>
                                <td>{studentName}</td>
                                <td>{`${promotor.title} ${promotor.name} ${promotor.surname}`}</td>
                                <td>{`${reviever.title} ${reviever.name} ${reviever.surname}`}</td>
                                <td>{dip.status}</td>
                                {buttons}
                            </tr>
                        )
                    })}
                </tbody>
                </table>
                <Modal show={this.state.showModal} onHide={()=>{this.setState({showModal: false})}} >
                    <DefenceForm onClick={this.sendDefense} />
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        diplomas: state.data.diplomas
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        declineDiploma: declineDiploma,
        confirmDiploma: confirmDiploma,
        getDiplomas: getDiplomas,
        createDefense: createDefense
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(AdminDiplomaList);
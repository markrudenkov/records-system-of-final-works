'use strict';

const React = require('react');
const {Component, PropTypes} = React;

const Modal = require('Modal');
const DiplomaInfo = require('DiplomaInfo');

const style = require('../scss/main.scss');
const styleButtons = require('../scss/_buttons.scss');
const styleListItem = require('../scss/userListItem.scss');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { getDiplomas } = require('../actions/academicActions');

class AcademicDiplomaList extends Component {

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.buttonMode = this.buttonMode.bind(this);
        this.writeRecension = this.writeRecension.bind(this);
        this.writeDefenceMark = this.writeDefenceMark.bind(this);
        this.state = {showModal: false};
    }

    componentWillMount() {
        this.props.getDiplomas(this.props.academicFiles.id);
    }

    buttonMode(diploma) {
        if (diploma.status === 'FOR_RECENSION') {
            return <button className={styleButtons.buttonPrimary} onClick={() => {this.writeRecension(diploma)}}>Write recension</button>
        } else if (diploma.status === 'FOR_DEFENCE') {
            return <button className={styleButtons.buttonPrimary} onClick={() => {this.writeDefenceMark(diploma)}}>Write defense mark</button>
        }
    }

    writeRecension(diploma) {
        console.log('Write recension');
    }
    writeDefenceMark(diploma) {
        console.log('Write defense mark');
    }

    showModal(diploma) {
        // const { academics } = this.props;
        // this.props.getFullDiploma(diploma.id, (data) => {
        //     this.setState({showModal: true, diploma: data.finalWork, recenzent: data.reviewer, promotor: data.promotor});
        //     return {
        //         type: 'NOTYPE'
        //     };
        // });
    }

    render() {
        const { diplomas, academicFiles } = this.props;
        return (
            <div className={style.center}>
                <h2>Diploma list</h2>
                <table className={style.table}>
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Link</th>
                        <th>Option</th>
                    </tr>
                    {diplomas.map((dip) => {
                        return (
                            <tr key={dip.id}>
                                <td>{dip.title}</td>
                                <td>{dip.status}</td>
                                <td><a target='_blank' href={`http://localhost:8080/files/${dip.filePath}`}>{dip.filePath}</a></td>
                                <td>{this.buttonMode(dip)}</td>
                            </tr>
                        )
                    })}
                </tbody>
                </table>
                <Modal show={this.state.showModal} onHide={()=>{this.setState({showModal: false})}} >
                </Modal>
            </div>
        );
                    //<DiplomaInfo title={title} annotation={annotation} promotor={this.state.promotor} recenzent={this.state.recenzent} />
    }
}

function mapStateToProps(state) {
    return {
        diplomas: state.data.diplomas,
        username: state.session.user.username,
        academicFiles: state.session.user.academicFiles
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getDiplomas: getDiplomas,
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(AcademicDiplomaList);
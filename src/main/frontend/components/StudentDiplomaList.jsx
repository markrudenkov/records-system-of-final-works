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

const { getDiplomas, claimDiploma, getStudent } = require('../actions/studentActions');
const { getAcademics } = require('../actions/apiActions');

class StudentDiplomaList extends Component {

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.claimDiploma = this.claimDiploma.bind(this);
        this.state = {showModal: false, diploma: {}, recenzent: {}, promotor: {}};
    }

    componentWillMount() {
        this.props.getAcademics();
        this.props.getDiplomas();
        this.props.getStudent(this.props.username);
    }

    claimDiploma() {
        const { diploma } = this.state;
        const { studentFiles } = this.props;
        const data = {
            studentId: studentFiles.id,
            id: diploma.id
        };
        this.props.claimDiploma(data);
    }

    showModal(diploma) {
        const { academics } = this.props;

        let recenzent = null; let promotor = null;

        for (var i = 0; i < academics.length; i++) {
            if (academics[i].id === diploma.promotorId) {
                promotor = academics[i];
            }
            if (academics[i].id === diploma.reviewerId) {
                recenzent = academics[i];
            }
        };
        this.setState({showModal: true, diploma: diploma, recenzent: recenzent, promotor: promotor});
    }

    render() {
        const { diplomas, studentFiles } = this.props;
        const { title, annotation } = this.state.diploma;
        const button = studentFiles.finalWorkID === 0 ? <button className={styleButtons.buttonSuccess} onClick={this.claimDiploma}>Choose this diploma work</button> : null;
        return (
            <div className={style.center}>
                <h2>Diploma list</h2>
                {diplomas.map((dip) => {
                    return (
                        <div key={dip.id} className={styleListItem.wrapper}>
                            <p className={styleListItem.itemText}>{dip.id}</p>
                            <p className={styleListItem.itemText}>{dip.title}</p>
                            <button className={styleButtons.buttonPrimary} onClick={() => {this.showModal(dip)}}>Details</button>
                        </div>
                    )
                })}
                <Modal show={this.state.showModal} onHide={()=>{this.setState({showModal: false})}} >
                    <DiplomaInfo title={title} annotation={annotation} promotor={this.state.promotor} recenzent={this.state.recenzent} />
                    <div className={style.center} >
                        { button }
                    </div>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        diplomas: state.data.diplomas,
        academics: state.data.users.academics,
        username: state.session.user.username,
        studentFiles: state.session.user.studentFiles
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getDiplomas: getDiplomas,
        getAcademics: getAcademics,
        claimDiploma: claimDiploma,
        getStudent: getStudent
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(StudentDiplomaList);
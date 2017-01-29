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

const getDiplomas = require('../actions/studentActions');
const { getAcademics } = require('../actions/apiActions');

class StudentDiplomaList extends Component {

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.state = {showModal: false, diploma: {}, recenzent: {}, promotor: {}};
    }

    componentWillMount() {
        this.props.getAcademics();
        this.props.getDiplomas();
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
        const { diplomas } = this.props;
        const { title, annotation } = this.state.diploma;
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
                        <button className={styleButtons.buttonSuccess} onClick={() => {}}>Choose this diploma work</button>
                    </div>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        diplomas: state.data.diplomas,
        academics: state.data.users.academics
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getDiplomas: getDiplomas,
        getAcademics: getAcademics
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(StudentDiplomaList);
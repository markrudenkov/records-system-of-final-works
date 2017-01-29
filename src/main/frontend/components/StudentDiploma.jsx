'use strict';

const React = require('react');
const {Component, PropTypes} = React;

const DiplomaInfo = require('DiplomaInfo');

const style = require('../scss/main.scss');
const styleButtons = require('../scss/_buttons.scss');
const styleListItem = require('../scss/userListItem.scss');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { getAcademics } = require('../actions/apiActions');

class StudentDiplomaList extends Component {

    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
        this.state = {showModal: false, diploma: {}, recenzent: {}, promotor: {}};
    }

    componentWillMount() {
        this.props.getAcademics();
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
                <h2>My Diploma</h2>
                <DiplomaInfo title={title} annotation={annotation} promotor={this.state.promotor} recenzent={this.state.recenzent} />
                <div className={style.center} >
                    <button className={styleButtons.buttonDanger} onClick={() => {}}>F#@k you diploma work</button>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        academics: state.data.users.academics
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getAcademics: getAcademics
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(StudentDiplomaList);
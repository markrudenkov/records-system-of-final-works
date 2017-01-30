'use strict';

const React = require('react');
const {Component, PropTypes} = React;

const DiplomaInfo = require('DiplomaInfo');

const style = require('../scss/main.scss');
const styleButtons = require('../scss/_buttons.scss');
const styleListItem = require('../scss/userListItem.scss');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { getFullDiploma, rejectDiploma } = require('../actions/studentActions');

class StudentDiplomaList extends Component {

    constructor(props) {
        super(props);
        this.discardDiploma = this.discardDiploma.bind(this);
        this.state = {diploma: {}, recenzent: {}, promotor: {}};
    }

    componentWillMount() {
        const { finalWorkID } = this.props.studentFiles;
        if (finalWorkID != 0) {
            this.props.getFullDiploma(finalWorkID, (data) => {
                this.setState({diploma: data.finalWork, recenzent: data.reviewer, promotor: data.promotor});
                return {
                    type: 'NOTYPE'
                };
            });
        }
    }

    discardDiploma() {
        const { diploma } = this.state;
        const { studentFiles } = this.props;
        const data = {
            studentId: studentFiles.id,
            id: diploma.id
        };
        this.props.rejectDiploma(data);
    }

    render() {
        const { title, annotation } = this.state.diploma;
        const { finalWorkID } = this.props.studentFiles;

        //if not chosen show nothing
        let diploma = finalWorkID != 0 ? (
            <div>
                <DiplomaInfo title={title} annotation={annotation} promotor={this.state.promotor} recenzent={this.state.recenzent} />
                <div className={style.center} >
                    <button className={styleButtons.buttonDanger} onClick={this.discardDiploma}>Reject diploma work</button>
                </div>
            </div>
        ) : <h4>You have no diploma</h4>;

        return (
            <div className={style.center}>
                <h2>My Diploma</h2>
                {diploma}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        studentFiles: state.session.user.studentFiles
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getFullDiploma: getFullDiploma,
        rejectDiploma: rejectDiploma
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(StudentDiplomaList);
'use strict';

const React = require('react');
const {Component, PropTypes} = React;

const DiplomaInfo = require('DiplomaInfo');

const style = require('../scss/main.scss');
const styleButtons = require('../scss/_buttons.scss');
const styleListItem = require('../scss/userListItem.scss');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { getFullDiploma, rejectDiploma, uploadDiploma } = require('../actions/studentActions');


class StudentDiplomaList extends Component {

    constructor(props) {
        super(props);
        this.discardDiploma = this.discardDiploma.bind(this);
        this.uploadDiploma = this.uploadDiploma.bind(this);
        this.state = {diploma: {}, recenzent: {}, promotor: {}, showDiscard: true};
    }

    componentWillMount() {
        const { finalWorkID } = this.props.studentFiles;
        if (finalWorkID != 0) {
            this.props.getFullDiploma(finalWorkID, (data) => {
                let showDiscard = data.finalWork.filePath ? false : true;
                this.setState({diploma: data.finalWork, recenzent: data.reviewer, promotor: data.promotor, showDiscard: showDiscard});
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

    uploadDiploma() {
        let data = new FormData();
        data.append('file', this.refs.file.files[0]);
        this.props.uploadDiploma(data, this.state.diploma.id);

        this.setState({diploma: {filePath: this.refs.file.files[0].name}, showDiscard: false});
    }

    render() {
        const { title, annotation, filePath } = this.state.diploma;
        const { finalWorkID } = this.props.studentFiles;

        let discard = this.state.showDiscard ?
            <button className={styleButtons.buttonDanger} onClick={this.discardDiploma}>Give up diploma work</button>
            : <a target='_blank' href={`http://localhost:8080/files/${filePath}`}>{filePath}</a>

        let diploma = finalWorkID != 0 ? (
            <div>
                <DiplomaInfo title={title} annotation={annotation} promotor={this.state.promotor} recenzent={this.state.recenzent} />
                <div className={style.center} >
                    { discard }
                    <div className={style.row} >
                        <input type='file' ref='file' title='upload file' />
                        <button className={styleButtons.buttonSuccess} onClick={this.uploadDiploma} >Upload file</button>
                    </div>
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
        rejectDiploma: rejectDiploma,
        uploadDiploma: uploadDiploma
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(StudentDiplomaList);
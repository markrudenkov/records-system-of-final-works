'use strict';

const React = require('react');
const {Component, PropTypes} = React;

const Modal = require('Modal');
const DynamicForm = require('DynamicForm');

const style = require('../scss/main.scss');
const styleButtons = require('../scss/_buttons.scss');
const styleListItem = require('../scss/userListItem.scss');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { getDiplomas, writeRecension } = require('../actions/academicActions');

class AcademicDiplomaList extends Component {

    constructor(props) {
        super(props);
        this.sendRecension = this.sendRecension.bind(this);
        this.buttonMode = this.buttonMode.bind(this);
        this.writeRecension = this.writeRecension.bind(this);
        this.writeDefenceMark = this.writeDefenceMark.bind(this);
        this.state = {showModal: false, currentDiploma: {}, modalContent: null};
    }

    componentWillMount() {
        this.props.getDiplomas(this.props.academicFiles.id);
    }

    buttonMode(diploma) {
        const { id } = this.props.academicFiles;

        if (diploma.status === 'FOR_RECENSION' && ((diploma.promotorId === id && diploma.promotorReviewId === 0) || (diploma.reviewerId === id && diploma.reviewerReviewId === 0))) {
            return <button className={styleButtons.buttonPrimary} onClick={() => {this.writeRecension(diploma)}}>Write recension</button>
        } else if (diploma.status === 'FOR_DEFENCE' && diploma.defense) {
            return <button className={styleButtons.buttonPrimary} onClick={() => {this.writeDefenceMark(diploma)}}>Write defense mark</button>
        } else {
            return <span>(no options)</span>
        }
    }

    writeRecension(diploma) {
        //modalContent
        let formData = [{
                type: 'input',
                props: {
                    type: 'text',
                    placeholder: 'Enter evaluation mark',
                    ref: 'evaluation'
                },
                label: 'Mark',
                validate: (text) => {
                    return '';
                }
            },
            {
                type: 'textarea',
                props: {
                    type: 'text',
                    placeholder: 'Enter Recension',
                    ref: 'description'
                },
                label: 'Recension',
                validate: (text) => {
                    if (text.length < 5) {
                        return 'recension is too short';
                    } else return '';
                }
        }];
        let content = <DynamicForm formData={formData} buttonLabel='Save recension' legend='Write recension' onClick={this.sendRecension} />;
        //set diploma to state
        this.setState({currentDiploma: diploma, showModal: true, modalContent: content});
    }
    sendRecension(recension) {
        const { id } = this.props.academicFiles;
        const { currentDiploma } = this.state;
        recension.finalWorkId = currentDiploma.id;
        recension.reviewerId = id;
        this.props.writeRecension(recension);
        this.setState({showModal: false});
    }
    writeDefenceMark(diploma) {
        console.log('Write defense mark');
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
                        <th>Student</th>
                        <th>Link</th>
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                    {diplomas.map((dip) => {
                        let student = dip.student ? `${dip.student.name} ${dip.student.surname}` : '';
                        return (
                            <tr key={dip.id}>
                                <td>{dip.title}</td>
                                <td>{student}</td>
                                <td><a target='_blank' href={`http://localhost:8080/files/${dip.filePath}`}>{dip.filePath}</a></td>
                                <td>{dip.status}</td>
                                <td>{this.buttonMode(dip)}</td>
                            </tr>
                        )
                    })}
                </tbody>
                </table>
                <Modal show={this.state.showModal} onHide={()=>{this.setState({showModal: false})}} >
                    {this.state.modalContent}
                </Modal>
            </div>
        );
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
        writeRecension: writeRecension
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(AcademicDiplomaList);
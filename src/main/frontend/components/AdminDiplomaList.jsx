'use strict';

const React = require('react');
const {Component, PropTypes} = React;
const DynamicListForm = require('DynamicListForm');
const style = require('../scss/main.scss');
const styleButtons = require('../scss/_buttons.scss');
const styleListItem = require('../scss/userListItem.scss');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');

const { declineDiploma, confirmDiploma, getDiplomas } = require('../actions/adminActions');

class AdminDiplomaList extends Component {

    componentWillMount() {
        this.props.getDiplomas();
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
                        <th>Status</th>
                        <th>Option</th>
                    </tr>
                    {diplomas.map((dip) => {
                        let buttons;
                        if (dip.status === 'REGISTERED') {
                            buttons = ( <td>
                                <button className={`${styleButtons.buttonSuccess} ${styleListItem.editButton}`} onClick={() => {this.props.confirmDiploma(dip.id)}}>Confirm</button>
                                <button className={styleButtons.buttonDanger} onClick={() => {this.props.declineDiploma(dip.id)}}>Decline</button>
                            </td>);
                        } else {
                            buttons = <td className={styleListItem.itemText}></td>
                        }
                        return (
                            <tr key={dip.id}>
                                <td>{dip.title}</td>
                                <td>{dip.status}</td>
                                {buttons}
                            </tr>
                        )
                    })}
                </tbody>
                </table>
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
        getDiplomas: getDiplomas
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(AdminDiplomaList);
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
                {diplomas.map((dip) => {
                    let buttons = <span />;
                    if (dip.status === 'REGISTERED') {
                        buttons = ( <div>
                            <button className={`${styleButtons.buttonSuccess} ${styleListItem.editButton}`} onClick={() => {this.props.confirmDiploma(dip.id)}}>Confirm</button>
                            <button className={styleButtons.buttonDanger} onClick={() => {this.props.declineDiploma(dip.id)}}>Decline</button>
                        </div>);
                    } else {
                        buttons = <span className={styleListItem.itemText}></span>
                    }
                    return (
                        <div key={dip.id} className={styleListItem.wrapper}>
                            <p className={styleListItem.itemText}>{dip.id}</p>
                            <p className={styleListItem.itemText}>{dip.title}</p>
                            <p className={styleListItem.itemText}>{dip.status}</p>
                            {buttons}
                        </div>
                    )
                })}
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
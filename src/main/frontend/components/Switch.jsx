'use strict';

const React = require('react');
const style = require('../scss/switch.scss');


class Switch extends React.Component {

    constructor(props) {
        super(props);
        this.switchOnChange = this.switchOnChange.bind(this);

        this.state = {isStudentOn: true};
    }

    switchOnChange(isStudentClick) {
        if ( (this.state.isStudentOn && !isStudentClick) || (!this.state.isStudentOn && isStudentClick) ) { // XOR
            this.props.switchChange(!this.state.isStudentOn);
            this.setState({isStudentOn: !this.state.isStudentOn});
        }
    }

    render() {
        return (
            <div className={style.switch}>
                <input onChange={()=>{this.switchOnChange(true)}} type='radio' className={style.switchInput} name='view' value='student' id='student' />
                <label htmlFor='student' className={`${style.switchLabel} ${style.switchLabelOff}`}>Student</label>
                <input onChange={()=>{this.switchOnChange(false)}} type='radio' className={style.switchInput} name='view' value='academic' id='academic' />
                <label htmlFor='academic' className={`${style.switchLabel} ${style.switchLabelOn}`}>Academic</label>
                <span className={style.switchSelection}></span>
            </div>
        );
    }
}

module.exports = Switch;
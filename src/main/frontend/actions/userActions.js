const { showNotification } = require('notificationActions');
const { fetchTest } = require('fetchActions');
const { hashHistory } = require('react-router');

function userLoginClick(user) {
    return (dispatch, getState) => {
        const state = getState();
        dispatch(fetchTest());
        dispatch(requestLogin(user)); // spinner, notify, stuff like that
        dispatch(showNotification('['+user.username+'] login in progress..', 'info'));
        return setTimeout(() => {return dispatch(receiveLogin({permission: 'STUDENT'}))},3000);
        //async fetch here
    };
}

function requestLogin(user) {
    return {
        type: 'REQUEST_LOGIN',
        user: user
    };
}

function receiveLogin(user) { //fetch success
    const func = () => {
        return {
            type: 'RECEIVE_LOGIN',
            user: user
        };
    };
    return (dispatch) => {
        hashHistory.push('/');
        dispatch(func());
        dispatch(showNotification('Welcome!', 'success'));
    };
}

function logout() {
    const func = () => {
        return {
            type: 'LOGOUT'
        };
    };
    return (dispatch) => {
        hashHistory.push('/');
        dispatch(showNotification('See ya!', 'success'));
        dispatch(func());
    };
}

module.exports = {
    userLoginClick,
    receiveLogin,
    requestLogin,
    logout
};
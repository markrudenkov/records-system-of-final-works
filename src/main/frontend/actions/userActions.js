const { showNotification } = require('notificationActions');
const { fetchReq } = require('fetchActions');
const { hashHistory } = require('react-router');
const { serialize } = require('queryfetch');
const jwt_decode = require('jwt-decode');

function userLoginClick(user) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch(requestLogin(user)); // spinner, notify, stuff like that
        dispatch(showNotification('['+user.username+'] login in progress..', 'info'));
        let data = { grant_type:'password', username: user.username, password: user.password, client_id: 'web-ui' };

        let encoded = btoa("web-ui:");

        const request = {
            credentials: 'include', //pass cookies, for authentication
            method: 'POST', // get, post, put, delete
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                'Authorization': 'Basic '+encoded,
            }, // x-access-token, stuff like that
            body: serialize(data)
        };

        dispatch(fetchReq('/oauth/token', request, receiveLogin));  ///oauth/token

    };
}

function requestLogin(user) {
    return {
        type: 'REQUEST_LOGIN',
        user: user
    };
}

function receiveLogin(data) { //fetch success
    data.decoded = jwt_decode(data.access_token);
    console.log(data);
    const func = () => {
        return {
            type: 'RECEIVE_LOGIN',
            user: data
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
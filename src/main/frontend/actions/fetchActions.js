const fetch = require('isomorphic-fetch');
const { showNotification } = require('notificationActions');
// const { hashHistory } = require('react-router');

function fetchReq(url, request, successCallback, errorCalback=defaultError) {
    return (dispatch, getState) => {

        return fetch(url, request)
        .then((response) => {
            if (response.status >= 400) {
                console.log(response);
                dispatch(errorCalback(response.status));
                throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            dispatch(successCallback(data));
        });
    };
}

function apiReq(url, req, successCallback, errorCalback) {
    return (dispatch, getState) => {
        const state = getState();
        const { token, token_type } = state.session.user;

        req.headers['Authorization'] = token_type+' '+token;

        console.log(req);
        dispatch(fetchReq(url, req, successCallback, errorCalback));
    }
}

function defaultError(status) {
    return showNotification('Error fetching. Status: '+status, 'danger');
}

// fetch(url, {
//   credentials: 'include', //pass cookies, for authentication
//   method: 'post',
//   headers: {
//   'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
//   'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
//   },
//   body: form
// });


module.exports = {
    fetchReq,
    defaultError,
    apiReq
};
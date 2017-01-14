const fetch = require('isomorphic-fetch');
const { showNotification } = require('notificationActions');
// const { hashHistory } = require('react-router');

function fetchReq(method, url, body, successCallback, errorCalback=defaultError) {
    return (dispatch, getState) => {
        const state = getState();
        const token = state.session.user.token;

        let contentType = method !== 'POST' ? 'application/x-www-form-urlencoded; charset=utf-8': 'application/json; charset=utf-8';

        const request = {
            credentials: 'include', //pass cookies, for authentication
            method: method, // get, post, put, delete
            headers: {
                'Content-Type': contentType,
                'Authorization': 'Basic '+token,
            }, // x-access-token, stuff like that
            body: body
        };
        //async fetch here

        return fetch(url, request)
        .then((response) => {
            if (response.status >= 400) {
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
    defaultError
};
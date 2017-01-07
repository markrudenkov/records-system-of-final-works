const fetch = require('isomorphic-fetch');
const { showNotification } = require('notificationActions');
const { hashHistory } = require('react-router');

function fetchReq(method, url, body, successCallback, errorCalback) {
    return (dispatch, getState) => {
        const state = getState();
        const token = state.session.user.token;

        const request = {
            credentials: 'include', //pass cookies, for authentication
            method: method, // get, post, put, delete
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                'x-access-token': token,
            }, // x-access-token, stuff like that
            body: body
        };
        //async fetch here

        return fetch(url, request)
        .then((response) => {
            if (response.status >= 400) {
                console.error('Bad response from server ' + response.status);
                dispatch(errorCalback(response.status));
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            dispatch(successCallback(data));
        });
    };
}

function fetchTest() {
    let url = 'https://jsonplaceholder.typicode.com/posts/1';

    const success = (data) => {
        console.log('SUCCESS!');
        console.log(data);
        return {
            type: 'SUCCESS'
        }
    }
    const error = (data) => {
        console.log('error!');
        console.log(data);
        return {
            type: 'ERROR'
        }
    }

    return fetchReq('get', url, {}, success, error);
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
    fetchTest
};
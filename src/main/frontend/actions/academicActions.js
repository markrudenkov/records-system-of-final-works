const { receiveDiplomas } = require('./adminActions');
const { showNotification } = require('notificationActions');
const { apiReq } = require('fetchActions');

function getAcademic(username) {
    const req = {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    };
    return (dispatch) => {
        dispatch(apiReq('api/academic/'+username, req, receiveAcademic));
    };
}

function getDiplomas(academicId) {
    const req = {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    };
    return (dispatch) => {
        dispatch(apiReq('api/academic/finalworks/'+academicId, req, receiveDiplomas));
    };
}

function receiveAcademic(data) {
    return {
        type: 'REICEIVE_ACADEMIC_INFO',
        data: data
    };
}

function changeRecensionState(data) {
    return {
        type: 'RECENSION_SENT',
        data: data
    };
}

function writeRecension(data) {
    const req = {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: data
    };
    return (dispatch) => {
        dispatch(apiReq('api/academic/review/', req, receiveDiplomas));
        dispatch(changeRecensionState(data));
    };
}


module.exports = {
    getAcademic,
    getDiplomas,
    writeRecension
};
const { showNotification } = require('notificationActions');
const { apiReq, fetchReq } = require('fetchActions');

function receiveDiplomas(data) {
    const action = () => {
        return {
            type: 'RECEIVE_DIPLOMAS',
            data: data
        };
    }
    return (dispatch) => {
        dispatch(showNotification('Diploma list update', 'success'));
        dispatch(action());
    };
}

function getDiplomas() {
    const req = {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    };
    return (dispatch) => {
        dispatch(showNotification('Loading diplomas...', 'info'));
        dispatch(apiReq('api/student/finalwork/', req, receiveDiplomas));
    };
}

function getFullDiploma(id, callBack) {
    const req = {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    };
    return (dispatch) => {
        dispatch(showNotification('Loading diploma...', 'info'));
        dispatch(apiReq('api/student/finalwork/'+id, req, callBack));
    };
}

function updateDiploma(data) {
    const req = {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    };
    const action = () => {
        return {
            type: data.status+'_DIPLOMA',
            data: data
        };
    }
    return (dispatch) => {
        dispatch(showNotification('Diploma list update', 'success'));
        dispatch(apiReq('api/student/finalwork/'+data.studentId, req));
        dispatch(action());
    };
}

function getStudent(username) {
    const req = {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    };
    return (dispatch) => {
        dispatch(apiReq('api/student/'+username, req, receiveStudent));
    };
}

function receiveStudent(data) {
    return {
        type: 'REICEIVE_STUDENT_INFO',
        data: data
    };
}

function claimDiploma(data) {
    data.status = 'RESERVED';
    return updateDiploma(data);
}

function rejectDiploma(data) {
    data.status = 'CONFIRMED';
    return updateDiploma(data);
}

function uploadDiploma(data, id) {
    const req = {
        credentials: 'include',
        method: 'POST',
        // headers: {
        //      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        //      'Content-Disposition': 'form-data; name="file"; filename=""'
        // },
        body: data
    };
    return (dispatch) => {
        dispatch(apiReq('api/student/finalwork/upload/'+id, req));
    };
}

module.exports = {
    getDiplomas,
    claimDiploma,
    getStudent,
    getFullDiploma,
    rejectDiploma,
    uploadDiploma
};
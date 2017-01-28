const { showNotification } = require('notificationActions');
const { apiReq } = require('fetchActions');

function registerUser(data, user) {
    const req = {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    };

    return (dispatch) => {
        dispatch(showNotification('Sending '+user+' info...', 'info'));
        dispatch(apiReq('api/admin/'+user, req));
    };
}

function registerStudent(data) {
    return (dispatch) => {
        dispatch(registerUser(data, 'student'));
    };
}

function registerAcademic(data) {
    return (dispatch) => {
        dispatch(registerUser(data, 'academic'));
    };
}

function changeDiplomaStatus(data) {
    const req = {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    };
    return (dispatch) => {
        dispatch(showNotification('Status changed', 'info'));
        dispatch(apiReq('api/finalwork/', req));
        dispatch(diplomaStatusChange(data));
    };
}

function confirmDiploma(id) {
    const data = {
        id: id,
        status: 'CONFIRMED'
    };
    return (dispatch) => {
        dispatch(changeDiplomaStatus(data));
    };
}

function declineDiploma(id) {
    const data = {
        id: id,
        status: 'DECLINED'
    };
    return (dispatch) => {
        dispatch(changeDiplomaStatus(data));
    };
}

function diplomaStatusChange(data) {
    return {
        type: 'DIPLOMA_STATUS_CHANGE',
        data: data
    };
}

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
        dispatch(apiReq('api/finalwork/', req, receiveDiplomas));
    };
}

module.exports = {
    registerAcademic,
    registerStudent,
    confirmDiploma,
    declineDiploma,
    getDiplomas
};
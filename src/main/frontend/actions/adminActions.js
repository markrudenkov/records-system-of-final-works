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
module.exports = {
    registerAcademic,
    registerStudent
};
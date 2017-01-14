const { showNotification } = require('notificationActions');
const { apiReq } = require('fetchActions');
const { serialize } = require('queryfetch');

function registerStudent(data) {
    const req = {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: data
    };

    return (dispatch) => {
        dispatch(showNotification('Sending student info...', 'info'));
        dispatch(apiReq('api/admin/academic', req));
    };
}

function registerAcademic(data) {
    const req = {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: data
    };

    return (dispatch) => {
        dispatch(showNotification('Sending academic info...', 'info'));
        dispatch(apiReq('api/admin/academic', req));
    };
}
module.exports = {
    registerAcademic,
    registerStudent
};
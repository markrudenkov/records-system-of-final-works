const { showNotification } = require('notificationActions');
const { apiReq } = require('fetchActions');

function getUsers(user, successCallback) {
    const req = {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    };

    return (dispatch) => {
        dispatch(showNotification('Loading '+user+' info...', 'info'));
        dispatch(apiReq('api/admin/'+user, req, successCallback));
    };
}

function deleteUser(user, id) {
    const req = {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
    };
    let successCallback = user == 'student' ? studentDeleted : academicDeleted;
    return (dispatch) => {
        dispatch(showNotification('Deleted '+user+' info...', 'info'));
        dispatch(apiReq('api/admin/'+user+'/'+id, req));
        dispatch(successCallback(id));
    };
}

function updateUser(user, data) {
    const req = {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(data)
    };
    let successCallback = user == 'student' ? studentUpdated : academicUpdated;
    return (dispatch) => {
        dispatch(showNotification('Deleted '+user+' info...', 'info'));
        dispatch(apiReq('api/admin/'+user+'/'+data.id, req));
        dispatch(successCallback(data));
    };
}

function studentDeleted(id) {
    return {
        type: 'STUDENT_DELETED',
        id: id
    };
}

function academicDeleted(id) {
    return {
        type: 'ACADEMIC_DELETED',
        id: id
    };
}

function studentUpdated(data) {
    return {
        type: 'STUDENT_UPDATED',
        data: data
    };
}

function academicUpdated(data) {
    return {
        type: 'ACADEMIC_UPDATED',
        data: data
    };
}


function getStudents() {
    return getUsers('student', receiveStudents);
}

function getAcademics() {
    return getUsers('academic', receiveAcademics);
}

function receiveStudents(data) {
    const action = () => {
        return {
            type: 'RECEIVE_STUDENTS',
            data: data
        };
    };
    return (dispatch) => {
        dispatch(showNotification('Student list update', 'success'));
        dispatch(action());
    };
}

function receiveAcademics(data) {
    const action = () => {
        return {
            type: 'RECEIVE_ACADEMICS',
            data: data
        };
    };
    return (dispatch) => {
        dispatch(showNotification('Academic list update', 'success'));
        dispatch(action());
    };
}

module.exports = {
    getAcademics,
    getStudents,
    deleteUser,
    updateUser
};
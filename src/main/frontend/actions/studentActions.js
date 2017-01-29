const { showNotification } = require('notificationActions');
const { apiReq } = require('fetchActions');

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

module.exports =
    getDiplomas
;
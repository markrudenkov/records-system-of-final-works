
const initialState = [];

function diplomaReducer(state=initialState, action) {
    switch(action.type) {
        case 'DIPLOMA_STATUS_CHANGE':
            state = Object.assign([], state);
            for (var i = 0; i < state.length; i++) {
                if (state[i].id == action.data.id) {
                    state[i].status = action.data.status;
                    break;
                }
            }
        break;
        case 'RECEIVE_DIPLOMAS':
            state = Object.assign([], initialState, action.data);
        break;
        case 'LOGOUT':
            state = Object.assign([], initialState);
        break;
    }
    return state;
}

module.exports = diplomaReducer;
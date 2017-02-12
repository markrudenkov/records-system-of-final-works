
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
        case 'RECENSION_SENT':
            state = Object.assign([], state);
            for (var i = 0; i < state.length; i++) {
                if (state[i].id == action.data.finalWorkId) {
                    state[i].promotorReviewId = 'xxx';
                    state[i].reviewerReviewId = 'xxx';
                    state[i].defense = {};
                    break;
                }
            }
        break;
        case 'DEFENSE_CREATED':
            state = Object.assign([], state);
            for (var i = 0; i < state.length; i++) {
                if (state[i].id == action.data.finalWorkId) {
                    state[i].defenceExists = true;
                    break;
                }
            }
        break;
        case 'SET_DEFENCE_MARK':
            state = Object.assign([], state);
            for (var i = 0; i < state.length; i++) {
                if (state[i].id == action.data.id) {
                    state[i].defence.evaluation = action.data.evaluation;
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
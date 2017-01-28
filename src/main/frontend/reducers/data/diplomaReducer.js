
const initialState = [{
        id: 1,
        title: 'Gra oparata na analizowaniu sztucznego intelektu wykorzystujac systemy biblioteki java ML',
        status: 'REGISTERED'
    },
    {
        id: 2,
        title: 'Test1',
        status: 'REGISTERED'
    },
    {
        id: 3,
        title: 'Test1',
        status: 'CONFIRMED'
    }
];

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
            state = Object.assign([], state, action.data);
        break;
        case 'LOGOUT':
            state = Object.assign([], initialState);
        break;
    }
    return state;
}

module.exports = diplomaReducer;
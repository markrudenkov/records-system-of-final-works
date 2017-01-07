
const initialState = {
    isLoggedIn: false,
    permission: 'GUEST',
    token: '',
};

function userReducer(state=initialState, action) {
    switch(action.type) {
        case 'RECEIVE_LOGIN':
            const {permission} = action.user;
            state = Object.assign({}, state, {isLoggedIn: true, permission: permission, token: '12334'});
        break;
        case 'LOGOUT':
            state = Object.assign({}, state, initialState);
        break;
    }
    return state;
}

module.exports = userReducer;
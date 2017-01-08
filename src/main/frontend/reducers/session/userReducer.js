
const initialState = {
    username: 'guest',
    isLoggedIn: false,
    permission: 'GUEST',
    token: '',
    refresh_token: '',
    token_type: ''
};

function userReducer(state=initialState, action) {
    switch(action.type) {
        case 'RECEIVE_LOGIN':
            const { access_token, refresh_token, token_type } = action.user;
            const permission = action.user.decoded.authorities[0];
            const username = action.user.decoded.user_name;

            let role = permission.replace('ROLE_', '');

            state = Object.assign({}, state, {
                isLoggedIn: true,
                permission: role,
                token: access_token,
                refresh_token: refresh_token,
                username: username,
                token_type: token_type
            });
        break;
        case 'LOGOUT':
            state = Object.assign({}, state, initialState);
        break;
    }
    return state;
}

module.exports = userReducer;
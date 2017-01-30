
const initialState = {
    username: 'guest',
    isLoggedIn: false,
    permission: 'GUEST',
    token: '',
    refresh_token: '',
    token_type: '',
    studentFiles: {}
};


function userReducer(state=initialState, action) {
    switch(action.type) {
        case 'RECEIVE_LOGIN':
            const { access_token, refresh_token, token_type } = action.user;
            const permission = action.user.decoded.authorities[0];
            const username = action.user.decoded.user_name;

            let role = permission.replace('ROLE_', '');
            console.log(action.user);
            state = Object.assign({}, state, {
                isLoggedIn: true,
                permission: role,
                token: access_token,
                refresh_token: refresh_token,
                username: username,
                token_type: token_type
            });
        break;
        case 'RESERVED_DIPLOMA':
            // choosen new diploma
            state = Object.assign({}, state, { studentFiles: { finalWorkID: action.data.id }});
        break;
        case 'CONFIRMED_DIPLOMA':
            // rejected diploma
            state = Object.assign({}, state, { studentFiles: { finalWorkID: 0 }});
        break;
        case 'REICEIVE_STUDENT_INFO':
            state = Object.assign({}, state, { studentFiles: action.data });
        break;
        case 'LOGOUT':
            state = Object.assign({}, initialState);
        break;
    }
    return state;
}

module.exports = userReducer;
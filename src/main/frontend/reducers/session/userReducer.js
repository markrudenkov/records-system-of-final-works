
const initialState = {
    username: 'guest',
    isLoggedIn: false,
    permission: 'GUEST',
    token: '',
    refresh_token: '',
    token_type: '',
    studentFiles: {},
    academicFiles: {}
};


function userReducer(state=initialState, action) {
    let studentFiles = Object.assign({}, state.studentFiles);
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
            console.log(action.data);
            studentFiles.finalWorkID = action.data.id;
            state = Object.assign({}, state, { studentFiles: studentFiles });
        break;
        case 'CONFIRMED_DIPLOMA':
            // rejected diploma
            studentFiles.finalWorkID = 0;
            state = Object.assign({}, state, { studentFiles: studentFiles });
        break;
        case 'REICEIVE_STUDENT_INFO':
            state = Object.assign({}, state, { studentFiles: action.data });
        break;
        case 'REICEIVE_ACADEMIC_INFO':
            state = Object.assign({}, state, { academicFiles: action.data });
        break;
        case 'LOGOUT':
            state = Object.assign({}, initialState);
        break;
    }
    return state;
}

module.exports = userReducer;
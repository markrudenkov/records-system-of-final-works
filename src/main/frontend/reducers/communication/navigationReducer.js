
const defaultLinks = [{
        title: 'UWB final works',
        url: '/'
    },
    {
        title: 'About',
        url: 'about'
    }
];

const guestLinks = defaultLinks.concat([{
        title: 'Login',
        url: 'login',
        alignRight: true
    }
]);

const adminLinks = defaultLinks.concat([{
        title: 'Diploma list',
        url: 'admin/diploma_list'
    },
    {
        title: 'User lists',
        url: 'admin/user_list'
    },
    {
        title: 'Register user',
        url: 'admin/register_user'
    },
    {
        title: 'Logout',
        url: 'logout',
        alignRight: true
    }
]);

const academicLinks = defaultLinks.concat([{
        title: 'Register Diploma',
        url: 'academic/register_diploma'
    },
    {
        title: 'Logout',
        url: 'logout',
        alignRight: true
    }
]);

const studentLinks = defaultLinks.concat([{
        title: 'My diploma',
        url: 'student/my_diploma'
    },
    {
        title: 'Diploma list',
        url: 'student/diploma_list',
    },
    {
        title: 'Logout',
        url: 'logout',
        alignRight: true
    }
]);

const initialState = {
    links: guestLinks
};

function navigationReducer(state=initialState, action) {
    switch(action.type) {
        case 'RECEIVE_LOGIN':
            const permission = action.user.decoded.authorities[0];
            let assignTo = guestLinks;
            switch(permission) {
                case 'ROLE_ADMIN':
                    assignTo = adminLinks;
                break;
                case 'ROLE_ACADEMIC':
                    assignTo = academicLinks;
                break;
                case 'ROLE_STUDENT':
                    assignTo = studentLinks;
                break;
            }
            state = Object.assign({}, state, {links: assignTo});
        break;
        case 'LOGOUT':
            state = Object.assign({}, state, {links: guestLinks});
        break;
    }
    return state;
}

module.exports = navigationReducer;
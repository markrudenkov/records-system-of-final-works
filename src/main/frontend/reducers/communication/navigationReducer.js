
const defaultLinks = [{
        title: 'UWB final works',
        url: '/'
    },
    {
        title: 'About',
        url: 'about'
    },
    {
        title: 'User lists',
        url: 'user_list'
    }
];

const guestLinks = defaultLinks.concat([{
        title: 'Login',
        url: 'login',
        alignRight: true
    }
]);

const adminLinks = defaultLinks.concat([{
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
        title: 'Register user',
        url: 'admin/register_user'
    },
    {
        title: 'Logout',
        url: 'logout',
        alignRight: true
    }
]);

const studentLinks = defaultLinks.concat([{
        title: 'Register user',
        url: 'admin/register_user'
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
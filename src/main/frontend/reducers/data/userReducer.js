
const academics = [
    {
        name: 'Jacek',
        surname: 'Placek',
        id: '123bc'
    },
    {
        name: 'Jacek',
        surname: 'Placek',
        id: '123abadsac'
    },
    {
        name: 'Jacek',
        surname: 'Placek',
        id: '123aabc'
    },
    {
        name: 'Jacek',
        surname: 'Placek',
        id: '123addsbc'
    },
    {
        name: 'Jacek',
        surname: 'Placek',
        id: '123aasdbc'
    },
];

const students = [
    {
        name: 'Wacek',
        surname: 'Macek',
        id: '123adsaaabc'
    },
    {
        name: 'Wacek',
        surname: 'Macek',
        id: '123ddddabc'
    },
    {
        name: 'Wacek',
        surname: 'Macek',
        id: '123aaaabc'
    },
    {
        name: 'Wacek',
        surname: 'Macek',
        id: '123fffabc'
    },
    {
        name: 'Wacek',
        surname: 'Macek',
        id: '123acccbc'
    },
];

const initialState = {
    students: students,
    academics: academics
};

function userReducer(state=initialState, action) {
    return state;
}

module.exports = userReducer;
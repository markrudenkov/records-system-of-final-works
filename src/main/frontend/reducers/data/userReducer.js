
const initialState = {
    students: [],
    academics: []
};

function userReducer(state=initialState, action) {
    let students = Object.assign([], state.students);
    let academics = Object.assign([], state.academics);

    switch(action.type) {
        case 'RECEIVE_ACADEMICS':
            state = Object.assign({}, state, {academics: action.data});
        break;
        case 'RECEIVE_STUDENTS':
            state = Object.assign({}, state, {students: action.data});
        break;
        case 'STUDENT_DELETED':
            for(let i=0; i < students.length; i++) {
                if(action.id === students[i].id) {
                    students.splice(i, 1);
                    return Object.assign({}, state, {students: students});
                }
            }
        break;
        case 'ACADEMIC_DELETED':
            for(let i=0; i < academics.length; i++) {
                if(action.id === academics[i].id) {
                    academics.splice(i, 1);
                    return Object.assign({}, state, {academics: academics});
                }
            }
        break;
        case 'STUDENT_UPDATED':
            for(let i=0; i < students.length; i++) {
                if(action.data.id === students[i].id) {
                    students[i] = action.data;
                    return Object.assign({}, state, {students: students});
                }
            }
        break;
        case 'ACADEMIC_UPDATED':
            for(let i=0; i < academics.length; i++) {
                if(action.data.id === academics[i].id) {
                    academics[i] = action.data;
                    return Object.assign({}, state, {academics: academics});
                }
            }
        break;
        case 'LOGOUT':
            state = Object.assign({}, initialState);
        break;
    }
    return state;
}

module.exports = userReducer;
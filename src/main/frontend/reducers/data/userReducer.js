
const initialState = {
    students: [],
    academics: []
};

function userReducer(state=initialState, action) {
    switch(action.type) {
        case 'RECIVE_ACADEMICS':
            state = Object.assign({}, state, {academics: action.data});
        break;
        case 'RECIVE_STUDENTS':
            state = Object.assign({}, state, {students: action.data});
        break;
        case 'STUDENTS_DELETED':
            for(let i=0; i < state.students.length; i++) {
                if(action.id === state.students[i].id) {
                    let students = state.students.splice(i, 1);
                    return Object.assign({}, state, {students: students});
                }
            }
        break;
        case 'ACADEMIC_DELETED':
            for(let i=0; i < state.academics.length; i++) {
                if(action.id === state.academics[i].id) {
                    let academics = state.academics.splice(i, 1);
                    return Object.assign({}, state, {academics: academics});
                }
            }
        break;
        case 'STUDENTS_UPDATED':
            for(let i=0; i < state.students.length; i++) {
                if(action.data.id === state.students[i].id) {
                    let students = state.students;
                    students[i] = action.data;
                    return Object.assign({}, state, {students: students});
                }
            }
        break;
        case 'ACADEMIC_UPDATED':
            for(let i=0; i < state.academics.length; i++) {
                if(action.data.id === state.academics[i].id) {
                    let academics = state.academics;
                    academics[i] = action.data;
                    return Object.assign({}, state, {academics: academics});
                }
            }
        break;
    }
    return state;
}

module.exports = userReducer;
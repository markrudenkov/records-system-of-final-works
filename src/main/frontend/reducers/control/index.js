const { combineReducers } = require('redux');
const formReducer = require('./formReducer');

const controlReducers = combineReducers({
    forms: formReducer
});

module.exports = controlReducers;
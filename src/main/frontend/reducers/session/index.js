const { combineReducers } = require('redux');
const userReducer = require('./userReducer');
const settingsReducer = require('./settingsReducer');

const sessionReducers = combineReducers({
    user: userReducer,
    settings: settingsReducer
});

module.exports = sessionReducers;
const { combineReducers } = require('redux');
const diplomaReducer = require('./diplomaReducer');
const userReducer = require('./userReducer');

const dataReducers = combineReducers({
    diplomas: diplomaReducer,
    users: userReducer
});

module.exports = dataReducers;
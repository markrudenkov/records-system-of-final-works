const { combineReducers } = require('redux');
const diplomaReducer = require('./diplomaReducer');

const dataReducers = combineReducers({
    diplomas: diplomaReducer
});

module.exports = dataReducers;
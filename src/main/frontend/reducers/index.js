const { combineReducers } = require('redux');
const communicationReducer = require('./communication');

const rootReducer = combineReducers({
    communication: communicationReducer
});

module.exports = rootReducer;
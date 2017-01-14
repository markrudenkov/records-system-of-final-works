const { combineReducers } = require('redux');

const communicationReducer = require('./communication');
const dataReducer = require('./data');
const sessionReducer = require('./session');
const controlReducer = require('./control');

const rootReducer = combineReducers({
    communication: communicationReducer,
    data: dataReducer,
    session: sessionReducer,
    control: controlReducer
});

module.exports = rootReducer;
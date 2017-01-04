const { combineReducers } = require('redux');
const notificationReducer = require('./notificationReducer');

const communicationReducer = combineReducers({
    notification: notificationReducer
});

module.exports = communicationReducer;
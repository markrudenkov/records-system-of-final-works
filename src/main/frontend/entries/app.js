'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { Router, Route, IndexRoute, hashHistory } = require('react-router');

const { showNotification } = require('../actions/notificationActions');
const { logout } = require('../actions/userActions');
const { apiReq } = require('../actions/fetchActions');

const HomePage = require('../components/HomePage');
const Layout = require('../components/Layout');
const Login = require('../components/Login');
const About = require('../components/About');
const NotFound = require('../components/NotFound');
const RegisterUser = require('../components/RegisterUser');
const UserList = require('../components/UserList');

const store = require('../store');

const checkPermission = (nextState, pushState, permission) => {
    const statePermission = store.getState().session.user.permission;
    if (statePermission !== permission) {
        store.dispatch(showNotification('ACCESS DENIED', 'danger'));
        pushState('/');
    }
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={Layout}>
                <IndexRoute component={HomePage} />
                <Route path='login' component={Login} />
                <Route path='about' component={About} />
                <Route path='user_list' component={UserList} />
                <Route path='admin' onEnter={(nextState, pushState)=>{checkPermission(nextState, pushState, 'ADMIN')}}>
                    <Route path='register_user' component={RegisterUser}/>
                </Route>
                <Route path='student' onEnter={(nextState, pushState)=>{checkPermission(nextState, pushState, 'STUDENT')}}>
                    <Route path='diploma_list' component={Login} />
                </Route>
                <Route path='academic' onEnter={(nextState, pushState)=>{checkPermission(nextState, pushState, 'ACADEMIC')}}>
                    <Route path='diploma_list' component={Login} />
                </Route>
                <Route path='logout' onEnter={() => store.dispatch(logout())} />
                <Route path='*' component={NotFound} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
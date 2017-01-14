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

const store = require('../store');

const checkPermission = (nextState, pushState, permission) => {
    const statePermission = store.getState().session.user.permission;
    if (statePermission !== permission) {
        store.dispatch(showNotification('ACCESS DENIED', 'danger'));
        pushState('/');
    }
};

const req = () => {
    const request = {
        credentials: 'include', //pass cookies, for authentication
        method: 'GET', // get, post, put, delete
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            //'Authorization': 'Basic '+encoded,
        }, // x-access-token, stuff like that
        //body: serialize(data)
    };
    store.dispatch(apiReq('api/item', request, ()=>{console.log('OK')}));
};

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={Layout}>
                <IndexRoute component={HomePage} />
                <Route path='login' component={RegisterUser} />
                <Route path='about' component={About} />
                <Route path='admin' onEnter={(nextState, pushState)=>{checkPermission(nextState, pushState, 'ADMIN')}}>
                    <Route path='register_user' onEnter={req} component={RegisterUser}/>
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
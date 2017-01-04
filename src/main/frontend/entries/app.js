'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const { Provider } = require('react-redux');
const { Router, Route, IndexRoute, Link, hashHistory } = require('react-router');


const HomePage = require('../components/HomePage');
const Layout = require('../components/Layout');
const Login = require('../components/Login');

const store = require('../store');

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={Layout}>
                <IndexRoute component={HomePage} />
                <Route path='login' component={Login} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const HomePage = require('../components/HomePage');
const Layout = require('../components/Layout');

ReactDOM.render(
    <Layout>
        <HomePage title = 'is awesome' />
    </Layout>,
    document.getElementById('root')
);
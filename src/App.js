import React, { Component } from 'react';
import Routes from './routes/Routes';
import { Cookies } from 'react-cookie';

// setup fake backend
import { configureFakeBackend } from './helpers';

// Themes

// default
import './assets/scss/theme.scss';

// dark
// import './assets/scss/theme-dark.scss';

// rtl
// import './assets/scss/theme-rtl.scss';

// configure fake backend
configureFakeBackend();

let cookies = new Cookies();
let user = {
    id: 1,
    username: 'test',
    firstName: 'test',
    lastName: 'test',
    role: 'Admin',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb2RlcnRoZW1lIiwiaWF0IjoxNTU1NjgyNTc1LCJleHAiOjE1ODcyMTg1NzUsImF1ZCI6ImNvZGVydGhlbWVzLmNvbSIsInN1YiI6InRlc3QiLCJmaXJzdG5hbWUiOiJIeXBlciIsImxhc3RuYW1lIjoiVGVzdCIsIkVtYWlsIjoidGVzdEBoeXBlci5jb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4ifQ.8qHJDbs5nw4FBTr3F8Xc1NJYOMSJmGnRma7pji0YwB4',
};

cookies.set('user', JSON.stringify(user), { path: '/' });

/**
 * Main app component
 */
class App extends Component {
    render() {
        return <Routes></Routes>;
    }
}

export default App;

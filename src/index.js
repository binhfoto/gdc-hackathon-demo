import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Dashboard from './components/Dashboard';
import * as serviceWorker from './serviceWorker';
import User from "./services/user.service";

User.getStatus()
    .then(isActive => {
        if (isActive) {
            ReactDOM.render(<Dashboard />, document.getElementById('root'));
        } else {
            window.location.href = 'account.html';
        }
    });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

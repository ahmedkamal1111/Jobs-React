import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReactNotifications from 'react-notifications-component';

const Root = (
    <Provider store={store}>
        <Router>
            <ReactNotifications />
            <App />
        </Router>
    </Provider>
);

ReactDOM.render( Root , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
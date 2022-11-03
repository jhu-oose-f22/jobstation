import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';

import reducers from './reducers'
<<<<<<< HEAD
import App from './App.js';
=======
import App from './App.jsx';
>>>>>>> 0e8f77957ac039a052a3e34550de8824ede01b5f

const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, applyMiddleware, compose } from 'redux';

import reducer

import App from './App.js';

ReactDOM.render(<App />, document.getElementById('root'));
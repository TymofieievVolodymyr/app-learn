import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from "./store/reducers/burgerBuilderReducer"
import orderReducer from "./store/reducers/orderReducer";
import authReducer from "./store/reducers/authReducer";
import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
    ord:orderReducer,
    bur: burgerBuilderReducer,
    auth: authReducer,
});

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();

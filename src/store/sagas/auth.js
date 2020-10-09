import {put} from 'redux-saga/effects';
import {delay} from "redux-saga/effects";
import * as actions from '../actions/index';

import * as actionTypes from '../actions/actionTypes';
import axios from "axios";

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(actions.logout())
}

export  function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
    }
    try {
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCnJGkNKtF0rWYztwzJuctNCMTME_vbUSA'
        if (!action.isSignedUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCnJGkNKtF0rWYztwzJuctNCMTME_vbUSA'
        }
        const response = yield axios.post(url, authData);

        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);

        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);

        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch (err) {
        console.log(err);
        yield  put(actions.authFail(err));
    }
}

export function*  authCheckStateSaga (action) {
    const token = yield localStorage.getItem('token');
    const userId = yield localStorage.getItem('userId');
    if (!token) {
        yield put (actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
        if (expirationDate > new Date()) {
            yield put (actions.authSuccess(token, userId));
            let foo = (expirationDate.getTime() - new Date().getTime())/1000
            yield put(actions.checkAuthTimeout(foo));
        } else {
            yield put(actions.logout());
        }
    }
}

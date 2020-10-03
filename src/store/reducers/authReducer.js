import * as actionTypes from "../actions/actionTypes"
import {updateObject} from "../../utility"

const initialState = {
    error: null,
    loading: false,
    userId: null,
    token: null,
}
const authStart = (state, action) => {
    return updateObject(state, {error: false, loading: true})
}
const authSuccess = (state, action) => {
    return updateObject(state, {
        error: false,
        loading: false,
        userId: action.userId,
        token: action.token,
    })
}
const authFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false})
}

const authLogout = (state, action) => {
    //action.history.push('/')
    return updateObject(state, {token: null, userId: null})
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }

}

export default authReducer;
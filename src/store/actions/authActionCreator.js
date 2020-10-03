import * as actionTypes from "../actions/actionTypes"
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
       // history:history
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    };
};

export const auth = (email, password, isSignedUp) => {
    return async dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        try {
            let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCnJGkNKtF0rWYztwzJuctNCMTME_vbUSA'
            if (!isSignedUp) {
                url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCnJGkNKtF0rWYztwzJuctNCMTME_vbUSA'
            }
            const response = await axios.post(url, authData)
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn))
        } catch (err) {
            console.log(err.response.data.error);
            dispatch(authFail(err.response.data.error));
        }
    }
};

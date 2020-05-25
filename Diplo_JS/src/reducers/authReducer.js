import { AuthAPI } from "../api/unsplashAPI"

let initialState = {
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_AUTH': 
            return {
                isAuth: action.authState
            }
        default: 
            return state;
    }
}

const setAuthState = (isAuth) => {
    return {
        type: 'SET_AUTH', 
        authState: isAuth
    }
}

export const getAuthThunk = (code) => (dispatch) => {
    AuthAPI.setAuthCode(code).then(() => {
        dispatch(setAuthState(true));
    })
}

export const setAuthThunk = (code) => (dispatch) => {
    AuthAPI.setAuthCodeFromLs(code);
    dispatch(setAuthState(true));
}

export const redirForAuth = () => {
    AuthAPI.redirForAuth();
}

export const initApp = () => (dispatch) => {
    let token = localStorage.getItem('unsplash_access_key');
    if(token) {
        AuthAPI.setAuthCodeFromLs(token);
        dispatch(setAuthState(true));
        
    } else {
        AuthAPI.redirForAuth();
    }
}

export default authReducer;
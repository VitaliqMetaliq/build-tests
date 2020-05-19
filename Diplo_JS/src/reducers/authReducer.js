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

export const redirForAuth = () => {
    AuthAPI.redirForAuth();
}

export default authReducer;
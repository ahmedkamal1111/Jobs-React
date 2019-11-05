import axios from 'axios';

import * as actionTypes from '../actionTypes';

export const authLoading = () => {
    return {
        type: actionTypes.AUTH_LAODING
    };
};

export const loginSuccess = (email, authorize) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        email,
        authorize
    };
};

export const loginFail = ( error ) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error
    };
};

export const confirmLoginSuccess = ( payload ) => {
    return {
        type: actionTypes.CONFIRM_LOGIN_SUCCESS,
        payload
    };
};

export const confirmLoginFail = ( error , res) => {
    return {
        type: actionTypes.CONFIRM_LOGIN_FAIL,
        error,
        res
    };
};

export const createPinSuccess = ( payload ) => {
    return {
        type: actionTypes.CREATE_PIN_SUCCESS,
        payload
    };
};

export const createPinFail = ( error ) => {
    return {
        type: actionTypes.CREATE_PIN_FAIL,
        error
    };
};

export const createPassSuccess = ( authorize ) => {
    return {
        type: actionTypes.CREATE_PIN_SUCCESS,
        authorize
    };
};

export const createPassFail = ( error ) => {
    return {
        type: actionTypes.CREATE_PIN_FAIL,
        error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('CID');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, 25000 * 1000);
    };
};

export const login = ( email ) => {
    return dispatch => {
        dispatch(authLoading());
        axios.post('https://joblaravel.tbv.cloud/entermail', {email: email})
        .then(response => {
            
            //Handle Response Status
            if ( response.status === 422 ) {
                throw new Error("Validation Failed.");
            };
            
            //Response is success      
            if ( response.status === 200 ) {
                dispatch(loginSuccess(email, response.data));
            }
        })
        .catch(error => {
            dispatch(loginFail(error));
        })
    };
};

export const confirmLogin = (email, password) => {
    return dispatch => {
        dispatch(authLoading());
        axios.post("https://joblaravel.tbv.cloud/login", { 
            email: email, 
            pw: password 
        })
        .then(response => {
            
            if( response.status === 422 ) {
                throw new Error("Validation Failed.");
            }

            if ( response.status === 200 || response.status === 201 ) {
                
                if (response.data === -1) {
                  throw new Error("Invalid email or Password");
                }

                const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000 /*response.data.expiresIn * 1000*/);
                localStorage.setItem('token', response.data.tokenEncoded);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('CID', response.data.user.CID);
                localStorage.setItem('userId', response.data.user.usr_id);
                dispatch(confirmLoginSuccess(response.data.user));
                dispatch(checkAuthTimeout(/* 60 * 60 * 1000  response.data.expiresIn */1));
            }
        })
        .catch(error => {
            dispatch(confirmLoginFail(error , -1));
        });
    }
}

export const createNewPass = (email, pin, password) => {
    return dispatch => {
        dispatch(authLoading());
        axios.post("https://joblaravel.tbv.cloud/ResetPassword", { 
            email: email,
            PIN: pin, 
            pw: password
        })
        .then(response => {
            
            if( response.status === 422 ) {
                throw new Error("Validation Failed.");
            }

            if (response.data === -1) {
                throw new Error("Invalid email or Password");
            }

            const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000 /*response.data.expiresIn * 1000*/);
            localStorage.setItem('token', response.data.tokenEncoded);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('CID', response.data.user.CID);
            localStorage.setItem('userId', response.data.user.usr_id);
            dispatch(createPassSuccess(response.data.user));
            dispatch(checkAuthTimeout(expirationDate.getTime()));
        })
        .catch(error => {
            dispatch(createPassFail(error, -1));
        });
    };
};

export const createPin = ( email ) => {
    return dispatch => {
        dispatch(authLoading());
        axios.post("https://joblaravel.tbv.cloud/createPin", {
            email: email
        })
        .then(response => {
            dispatch(createPinSuccess(response.data));
        })
        .catch(error => {
            dispatch(createPinFail(error));
        })
    };
};

export const authRedirectPath = ( path ) => {
    return { 
        type: actionTypes.AUTH_REDIRECT_PATH,
        path
    };
};

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const CID = localStorage.getItem('CID');
                const userId = localStorage.getItem('userId');
                const payload = {
                    usr_id: userId,
                    tokenEncoded: token,
                    CID: CID
                }
                dispatch(confirmLoginSuccess(payload));
                dispatch(checkAuthTimeout( /*(expirationDate.getTime() - new Date().getTime()) / 1000 )*/ ));
            }   
        }
    };
};
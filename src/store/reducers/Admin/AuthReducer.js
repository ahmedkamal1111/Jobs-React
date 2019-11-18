import * as actionTypes from "../../actions/actionTypes";

const initialState = {
    email: null,
    authorize: null,
    CID: null,
    token: null,
    refreshToken: null,
    userId: null,
    name: null,
    priv: null,
    uprofile: null,
    error: null,
    isLoading: false,
    authRedirectPath: '/aa/:anything'
}

const authLoading = (state, action) => {
    return {
        ...state,
        error: null,
        isLoading: true 
    };
};

const loginSuccess = (state, action) => {
    return {
        ...state,
        email: action.email,
        authorize: action.authorize,
        error : null,
        isLoading : false,
    };
};

const loginFail = ( state, action ) => {
    return {
        ...state,
        error: action.error.message,
        isLoading: false
    };
};

const confirmLoginSuccess = (state, action) => {
    return{
        ...state,
        authorize: action.payload.authorize,
        CID: action.payload.CID,
        token: action.payload.api_token,
        userId: action.payload.usr_id,
        name: action.payload.Name,
        priv: action.payload.priv,
        uprofile: action.payload.uprofile,
        error: null,
        isLoading: false
    };
};

const confirmLoginFail = (state, action) => {
    return {
        ...state,
        authorize: action.res,
        error: action.error,
        isLoading: false,
    };
};

const createPassSuccess = (state, action) => {
    return{
        ...state,
        authorize: action.payload.authorize,
        CID: action.payload.CID,
        token: action.payload.api_token,
        userId: action.payload.usr_id,
        name: action.payload.Name,
        priv: action.payload.priv,
        uprofile: action.payload.uprofile,
        error: null,
        isLoading: false
    };
};

const createPassFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        authorize: action.authorize,
        isLoading: false
    }
}

const createPinSuccess = (state, action) => {
    return {
        ...state,
        authorize: action.payload,
        error: null,
        isLoading: false
    };
};

const createPinFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        isLoading: false
    };
}; 

const authLogout = (state, action) => {
    return {
        ...state,
        email: null,
        authorize: null,
        CID: null,
        token: null,
        name: null,
        userId: null,
        priv: null,
        uprofile: null,
    };
};

const authRedirectPath= (state, action) => {
    return {
        ...state,
        authRedirectPath: action.path
    };
};

const AuthReducer = (state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.AUTH_LAODING: return authLoading(state, action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL:  return loginFail(state, action);
        case actionTypes.CONFIRM_LOGIN_SUCCESS: return confirmLoginSuccess(state, action);
        case actionTypes.CONFIRM_LOGIN_FAIL:  return confirmLoginFail(state, action);
        case actionTypes.CREATE_PIN_SUCCESS : return createPinSuccess(state, action);
        case actionTypes.CREATE_PIN_FAIL:  return createPinFail(state, action);
        case actionTypes.CREATE_PASS_SUCCESS : return createPassSuccess(state, action);
        case actionTypes.CREATE_PASS_FAIL:  return createPassFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        case actionTypes.AUTH_REDIRECT_PATH: return authRedirectPath(state,action);
        default:
            return state;
    }    
}

export default AuthReducer;
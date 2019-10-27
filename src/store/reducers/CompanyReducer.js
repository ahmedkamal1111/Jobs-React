import * as actionTypes from '../actions/actionTypes';

const initialState = {
    info: {
        cid: null,
        Name: "",
        url: "",
        logo: "",
        payment_id: null,
        color1: null,
        color2: null,
        color3: null,
        homepage: "",
        login_branding: '',
        support_email : "",
        welcome : "",
    },
    isLoading: false,
    error: null
}

const loadCompanyInfo = ( state, action ) => ({
    ...state,
    isLoading: true,
    error: null
})

const fetchCompanyInfoSuccess = ( state, action ) => ({
    ...state,
    info: {
        ...state.info,
        cid: action.payload.cid,
        Name: action.payload.Name,
        url: action.payload.url,
        logo: action.payload.logo,
        payment_id: action.payload.payment_id,
        color1: action.payload.c1,
        color2: action.payload.c2,
        color3: action.payload.c3,
        homepage: action.payload.homepage,
        login_branding: action.payload.login_branding,
        support_email : action.payload.support_email,
        welcome : action.payload.welcome,
    },
    error: null,
    isLoading: false
});

const fetchCompanyInfoFail = ( state, action ) => ({
    ...state, 
    isLoading: false,
    error: action.error
});

const CompanyInfo = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.COMPANYINFO_LOADING: return loadCompanyInfo(state, action);
        case actionTypes.COMPANYINFO_SUCCESS: return fetchCompanyInfoSuccess(state, action);
        case actionTypes.COMPANYINFO_FAIL: return fetchCompanyInfoFail(state, action);
        default:
            return state;
    }
}

export default CompanyInfo;
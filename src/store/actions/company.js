import axios from 'axios';

import * as actionTypes from './actionTypes';

export const loadCompanyInfo = () => {
    return {
        type: actionTypes.COMPANYINFO_LOADING
    }
}

export const companyInfoSuccess = ( payload )  => {
    return {
        type: actionTypes.COMPANYINFO_SUCCESS ,
        payload: payload
    }
}

export const companyInfoFail = ( error ) => {
    return {
        type: actionTypes.COMPANYINFO_FAIL,
        error: error
    };
}

export const fetchCompanyInfo = ( param ) => {
    return dispatch => {
        dispatch(loadCompanyInfo());
        axios.get(`http://joblaravel.tbv.cloud/aa/${param}`)
        .then(response => {
            if(!response.data.success) {
                throw new Error("Sorry, you are not subscribe");
            }
            dispatch(companyInfoSuccess(response.data.company));
        })
        .catch(error => {
            dispatch(companyInfoFail(error))
        })
    }
}
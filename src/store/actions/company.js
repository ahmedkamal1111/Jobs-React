import axios from 'axios';

import * as actionTypes from './actionTypes';

export const loadCompanyInfo = () => {
    return {
        type: actionTypes.COMPANYINFO_LOADING
    }
}

export const companyInfoSuccess = ( param, payload )  => {
    return {
        type: actionTypes.COMPANYINFO_SUCCESS,
        param,
        payload
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
        axios.get(`https://joblaravel.tbv.cloud/aa/${param}`)
        .then(response => {
            if(!response.data.success) {
                throw new Error("Sorry, you are not subscribe");
            }
            localStorage.setItem('CID', response.data.company.cid);
            localStorage.setItem('companyName', response.data.company.Name);
            dispatch(companyInfoSuccess(param, response.data.company));
        })
        .catch(error => {
            dispatch(companyInfoFail(error))
        })
    }
}
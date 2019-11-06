import axios from 'axios';

import * as actionTypes from '../actionTypes';

export const loadJobTypes = () => {
    return {
        type: actionTypes.FETCH_JOB_TYPE_LOADING,
    };
};

export const fetchJobTypesSuccess = ( jobTypes ) => {
    return {
        type: actionTypes.FETCH_JOB_TYPE_SUCCESS,
        jobTypes
    };
};

export const fetchJobTypesFail = ( error ) => {
    return {
        type: actionTypes.FETCH_JOB_TYPE_LOADING,
        error
    };
};

export const fetchJobTypes = () => {
    return dispatch => {
        dispatch(loadJobTypes());
        axios.get("https://joblaravel.tbv.cloud/jobtypes")
        .then(response => {
            dispatch(fetchJobTypesSuccess(response.data));
        })
        .catch(error => {
            dispatch(fetchJobTypesFail(error));
        })
    };
};

export const loadJobPositions = () => {
    return {
        type: actionTypes.JOB_POSTIONS_LODING,
    };
};

export const getJobsSuccess = positions => {
    return {
        type: actionTypes.FETCH_JOB_POSTIONS_SUCCESS,
        positions,
    };
};

export const getJobsFail = error => {
    return {
        type: actionTypes.FETCH_JOB_POSTIONS_FAIL,
        error,
    };
};

export const fetchJobPositions = () => {
    const cid = localStorage.getItem("CID");
    return dispatch => {
        dispatch(loadJobPositions());
        axios.get("https://joblaravel.tbv.cloud/jobs", {
            params: {
                cid
            }
        }).then(response => {
            dispatch(getJobsSuccess(response.data));
        }).catch(error => {
            dispatch(getJobsFail(error));
        })
    };
};

export const loadFiltering = () => {
    return {
        type: actionTypes.FILTER_LOADING,
    };
};

export const filterSuccess = ( candidates ) => {
    return {
        type: actionTypes.FILTER_SUCCESS,
        candidates,
    };
};

export const filterFail = ( error ) => {
    return {
        type: actionTypes.FILTER_FAIL,
        error,
    };
};

export const filter = ( data ) => {
    const token = localStorage.getItem("token");
    const CID = localStorage.getItem("CID");
    return dispatch => {
        dispatch(loadFiltering());
        axios.post("https://joblaravel.tbv.cloud/filter", data ,{
            params:{ CID },
            headers: { Authorization: token }
        })
        .then(response => {
            dispatch(filterSuccess(response.data));
        })
        .catch(error => {
            dispatch(filterFail(error));
        })
    };
};
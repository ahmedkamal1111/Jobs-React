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
    const CID = localStorage.getItem("CID");
    return dispatch => {
        dispatch(loadJobPositions());
        axios.get("https://joblaravel.tbv.cloud/jobs", {
            params: {
                CID
            }
        }).then(response => {
            dispatch(getJobsSuccess(response.data));
        }).catch(error => {
            dispatch(getJobsFail(error));
        })
    };
};
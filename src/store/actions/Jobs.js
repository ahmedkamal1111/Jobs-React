import axios from "axios";

import * as actionTypes from "./actionTypes";

export const loadJobs = () => {
    return {
        type: actionTypes.JOBS_LOADING,
    };
};

export const loadJobsSuccess = payload => {
    return {
        type: actionTypes.FETCH_JOBS_SUCCESS,
        payload,
    };
};

export const loadJobsFail = error => {
    return {
        type: actionTypes.FETCH_JOBS_FAIL,
        error
    };
};

export const loadJobDetail = () => {
    return {
        type: actionTypes.JOB_DETAIL_LOADING,
    };
};

export const fetchJobDetailSuccess = ( respons, skills, jobName, jobType ) => {
    return {
        type: actionTypes.FETCH_JOB_DETAIL_SCUCCESS,
        respons,
        skills,
        jobName,
        jobType,
    };
};

export const fetchJobDetailFail = ( error ) => {
    return {
        type: actionTypes.FETCH_JOB_DETAIL_FAIL,
        error
    };
};

export const fetchJobs = ( CID ) => {
    return dispatch => {
        dispatch(loadJobs());
        axios.get("https://joblaravel.tbv.cloud/jobs", {
            params: { cid : CID }
        })
        .then(response => {
            let jobs = response.data.filter(job => job.Job_Type !== 5);
            dispatch(loadJobsSuccess(jobs));
        })
        .catch(error => {
            dispatch(loadJobsFail(error));
        });
    };
};

export const fetchJobDetail = ( cid , jobId ) => {
    console.log(cid, jobId);
    return dispatch => {
        dispatch(loadJobDetail());
        axios.get("https://joblaravel.tbv.cloud/job-detail", {
            params: { cid, jobId }
        })
        .then(response => {
            let respo = response.data.Respo.split("*")
            respo.shift(respo[0]);
            
            let skills = response.data.Skills.split("*")
            skills.shift(skills[0]);
            dispatch(fetchJobDetailSuccess(respo, skills, response.data.Name, response.data.Job_Type));
        })
        .catch(error => {
            dispatch(fetchJobDetailFail(error));
        });
    };
};
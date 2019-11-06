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

export const loadJobApply = () => {
    return {
        type: actionTypes.JOB_APPLY_LOADING,
    };
};

export const fetchJobApplyDataSuccess = (uni, loc, genders) => {
    return {
        type: actionTypes.FETCH_JOB_APPLY_SUCCESS,
        uni,
        loc,
        genders
    };
};

export const fetchJobApplyDataFail = (error) => {
    return {
        type: actionTypes.FETCH_JOB_APPLY_FAIL,
        error,
    };
};


export const loadJobName = () => {
    return {
        type: actionTypes.LOAD_JOB_APPLIED,
    };
};

export const fetchJobNameSuccess = ( jobName ) => {
    return {
        type: actionTypes.FETCH_JOB_APPLIED_SUCCESS,
        jobName,
    };
};

export const fetchJobNameFail = ( error ) => {
    return {
        type: actionTypes.FETCH_JOB_APPLIED_FAIL,
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
            dispatch(loadJobsSuccess(response.data));
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

export const fetchJobApplyData =  () => {
    return async dispatch => {
        await dispatch(loadJobApply());
        try {
            const uniResponse = await axios.get("https://joblaravel.tbv.cloud/show_universities");        
            let uni = uniResponse.data.map(item => ({ value: item.id, label: item.Name }));
            const locResponse = await axios.get("https://joblaravel.tbv.cloud/show_locations");
            let loc = locResponse.data.map(item => ({value: item.id, label: item.Name}));
            const genderResponse = await axios.get("https://joblaravel.tbv.cloud/show_genders");
            let genders = genderResponse.data.map(item => ({ value: item.id, label: item.Name}));
            dispatch(fetchJobApplyDataSuccess(uni, loc, genders));
        } catch ( err ) {
            dispatch(fetchJobApplyDataFail(err));
        }
    };
};

export const fetchJobApplied = ( jobId ) => {
    const cid = localStorage.getItem("CID");
    return dispatch => {
        dispatch(loadJobName());
        axios.get("https://joblaravel.tbv.cloud/jobs", { params: { cid : cid }})
        .then(response => {
            let jobName = response.data.filter(i => jobId === i.id).map(i => ({
                value: i.Name, label: i.Name 
            }));
            dispatch( fetchJobNameSuccess( jobName[0]) );
        }).catch(error => {
            dispatch( fetchJobNameFail(error) );
        });
    };
};

export const postJobApplyLoading = () => {
    return {
        type: actionTypes.POST_JOB_APPLIED_LOADING,
    };
};

export const postJobApplySuccess = ( message ) => {
    return {
        type: actionTypes.POST_JOB_APPLIED_SUCCESS,
        message
    };
};

export const postJobApplyFail = ( error ) => {
    return {
        type: actionTypes.POST_JOB_APPLIED_FAIL,
        error
    };
};

export const postJobApply = ( data ) => {
    const CID = localStorage.getItem("CID");
    return dispatch => {
        dispatch(postJobApplyLoading());

        axios.post("https://joblaravel.tbv.cloud/job/store", data , {
            params:{ CID }
        })
        .then(response => {
            if (!(response.status === 200 || response.status === 201)){
                throw new Error("Service not available now retry again after some period");
            }
            dispatch(postJobApplySuccess(response.data));
        })
        .catch(error => dispatch(postJobApplyFail(error)));
    };
};
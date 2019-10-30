import * as actionTypes from '../actions/actionTypes';

const initialState = {
    jobs : [],
    respons: [],
    skills: [],
    location: "Zayed, Giza",
    jobName: null,
    jobType: null,
    error: null,
    isLoading: false
};

const loadJobs = (state, action) => ({
    ...state,
    error: null,
    isLoading: true
});

const fetchJobsSuccess = (state, action) => ({
    ...state,
    jobs: action.payload,
    error: null,
    isLoading: false
});

const fetchJobsFail = (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false
});

const loadJobDetail = (state, action) => ({
    ...state,
    error: null,
    isLoading: true
});

const fetchJobDetailSuccess = (state, action) => ({
    ...state,
    respons: action.respons,
    skills: action.skills,
    jobName: action.jobName,
    jobType: action.jobType,
    error: null,
    isLoading: false
});

const fetchJobDetailFail = (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false
});


const JobsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.JOBS_LOADING: return loadJobs(state,action);
        case actionTypes.FETCH_JOBS_SUCCESS: return fetchJobsSuccess(state, action);
        case actionTypes.FETCH_JOBS_FAIL: return fetchJobsFail(state, action);
        case actionTypes.JOB_DETAIL_LOADING: return loadJobDetail(state,action);
        case actionTypes.FETCH_JOB_DETAIL_SCUCCESS: return fetchJobDetailSuccess(state, action);
        case actionTypes.FETCH_JOB_DETAIL_FAIL: return fetchJobDetailFail(state, action);
        default:
            return state;
    };
}

export default JobsReducer;
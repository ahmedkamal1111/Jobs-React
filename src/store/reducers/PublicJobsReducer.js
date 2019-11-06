import * as actionTypes from '../actions/actionTypes';

const initialState = {
    jobs : [],
    respons: [],
    skills: [],
    universities: [],
    genders: [],
    locations: [],
    JobApplied: null,
    location: "Zayed, Giza",
    jobName: null,
    jobType: null,
    error: null,
    postMessage: "",
    isLoading: false,
    postDataLoading: false
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
    error: action.error.message,
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
    error: action.error.message,
    isLoading: false
});

const loadJobApply = (state, action) => ({
    ...state,
    error: null,
    isLoading: true
});

const fetchJobApplySuccess = (state, action) => ({
    ...state,
    universities: action.uni,
    locations: action.loc,
    genders: action.genders,
    error: null,
    isLoading: false
});

const fetchJobApplyFail = (state, action) => ({
    ...state,
    error: action.error.message,
    isLoading: false
});

const loadJobApplied = (state, action) => ({
    ...state,
    error: null,
    loading: true,
});

const fetchJobAppliedSuccess = (state, action) => ({
    ...state,
    JobApplied: action.jobName,
    error: null,
    loading: false,
});

const fetchJobAppliedFail = (state, action) => ({
    ...state,
    error: action.error.message,
    loading: false,
});

const postJobLoading = (state, action) => ({
    ...state,
    error: null,
    postDataLoading: true
});

const postJobSuccess = (state, action) => ({
    ...state, 
    postMessage: action.message,
    error: null,
    postJobLoading: false,
});

const postJobFail = (state, action) => ({
    ...state,
    error: action.error.message,
    postDataLoading: false,
});

const PublicJobsReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.JOBS_LOADING: return loadJobs(state,action);
        case actionTypes.FETCH_JOBS_SUCCESS: return fetchJobsSuccess(state, action);
        case actionTypes.FETCH_JOBS_FAIL: return fetchJobsFail(state, action);
        case actionTypes.JOB_DETAIL_LOADING: return loadJobDetail(state,action);
        case actionTypes.FETCH_JOB_DETAIL_SCUCCESS: return fetchJobDetailSuccess(state, action);
        case actionTypes.FETCH_JOB_DETAIL_FAIL: return fetchJobDetailFail(state, action);
        case actionTypes.JOB_APPLY_LOADING: return loadJobApply(state, action);
        case actionTypes.FETCH_JOB_APPLY_SUCCESS: return fetchJobApplySuccess(state, action);
        case actionTypes.FETCH_JOB_APPLY_FAIL: return fetchJobApplyFail(state, action);
        case actionTypes.LOAD_JOB_APPLIED: return loadJobApplied(state, action);
        case actionTypes.FETCH_JOB_APPLIED_FAIL: return fetchJobAppliedFail(state, action);
        case actionTypes.FETCH_JOB_APPLIED_SUCCESS: return fetchJobAppliedSuccess(state, action);
        case actionTypes.POST_JOB_APPLIED_LOADING: return postJobLoading(state, action);
        case actionTypes.POST_JOB_APPLIED_SUCCESS: return postJobSuccess(state, action);
        case actionTypes.POST_JOB_APPLIED_FAIL: return postJobFail(state, action);
        default:
            return state;
    };
}

export default PublicJobsReducer;
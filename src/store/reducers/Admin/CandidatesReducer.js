import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    //JobTypes
    jobTypes: [{name: "Choose Jop Position", value: 'disabled' }],
    //JobPositions
    positions:{
        fullTime:[
            {value: 'disabled', Name: 'Choose job position'}
        ],
        project:[
            {value: 'disabled', Name: 'Choose job position'}
        ],
        partTime:[
            {value: 'disabled', Name: 'Choose job position'}
        ],
        freelance:[
            {value: 'disabled', Name: 'Choose job position'}
        ],
    },
    internPosition: [
        {value: 'disabled', Name: 'Choose intern position'}
    ],
    jobName: [],
    //FilterDataJobsAndInten
    response: false,
    searchResults: [],
    error: null,
    loading: false,
};

const loadJobTypes = ( state , action ) => ({
    ...state,
    error: null,
    loading: true,
});

const fetchJobTypesSuccess = ( state, action )=> ({
    ...state,
    jobTypes: [
        ...state.jobTypes,
        ...action.jobTypes.filter(jobType => jobType.id !== 5)
    ],
    error: null,
    loading: false,
});

const fetchJobTypesFail = ( state, action ) => ({
    ...state,
    error: action.error.message,
    loading: false,
});

const loadJobPositions = (state, action) => ({
    ...state,
    error: null,
    loading: true,
});

const getJobPositionsSuccess = (state, action) => ({
    ...state,
    internPosition: [
      ...state.internPosition,
      ...action.positions.filter(job => job.Job_Type === 5)  
    ],
    positions: {
        ...state.positions,
        fullTime: [
            ...state.positions.fullTime,
            ...action.positions.filter(job => job.Job_Type === 1)
        ],
        project: [
            ...state.positions.project,
            ...action.positions.filter(job => job.Job_Type === 2)
        ],
        partTime: [
            ...state.positions.partTime,
            ...action.positions.filter(job => job.Job_Type === 3)
        ],
        freelance: [
            ...state.positions.freelance,
            ...action.positions.filter(job => job.Job_Type === 4)
        ],
    },
    jobName: [
        ...state.jobName,
        ...action.positions.filter(job => job.Job_Type !== 5)
    ],
    error: null,
    loading: false
});

const getJobPositionsFail = (state, action) => ({
    ...state,
    error: action.error.message,
    loading: false
});

const loadFilter = (state, action) => ({
    ...state,
    response: false,
    error: null,
    loading: true,
});

const filterSuccess = (state, action) => ({
    ...state,
    response: true,
    searchResults: action.candidates,
    // search: {
    //     ...state.search,
    //     startDate: null,
    //     endDate: null,
    //     customDate: "disabled",
    // },
    error: null,
    loading: false,
});

const filterFail = (state, action) => ({
    ...state,
    // search: {
    //     ...state.search,
    //     startDate: null,
    //     endDate: null,
    //     customDate: "disabled",
    // },
    error: action.error.message,
    loading: false,
});

const CandidatesReducer = (state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.FETCH_JOB_TYPE_LOADING: return loadJobTypes(state, action);
        case actionTypes.FETCH_JOB_TYPE_SUCCESS: return fetchJobTypesSuccess(state, action);
        case actionTypes.FETCH_JOB_TYPE_FAIL: return fetchJobTypesFail(state, action);
        case actionTypes.JOB_POSTIONS_LODING: return loadJobPositions(state, action);
        case actionTypes.FETCH_JOB_POSTIONS_SUCCESS: return getJobPositionsSuccess(state, action);
        case actionTypes.FETCH_JOB_POSTIONS_FAIL: return getJobPositionsFail(state, action);
        case actionTypes.FILTER_LOADING: return loadFilter(state, action);
        case actionTypes.FILTER_SUCCESS: return  filterSuccess(state, action);
        case actionTypes.FILTER_FAIL: return  filterFail(state, action);
        default:
            return state;
    };
};

export default CandidatesReducer;
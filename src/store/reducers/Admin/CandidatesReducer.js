import * as actionTypes from '../../actions/actionTypes';

const initialState = {
    //JobTypes
    jobTypes: [{ id: 0, name: "Choose Jop Position", value: 'disabled' }],
    //JobPositions
    positions:{
        fullTime:[
            {id: 0, value: 'disabled', name: 'Choose job position'}
        ],
        project:[
            {id: 0, value: 'disabled', name: 'Choose job position'}
        ],
        partTime:[
            {id: 0, value: 'disabled', name: 'Choose job position'}
        ],
        freelance:[
            {id: 0, value: 'disabled', name: 'Choose job position'}
        ],
    },
    internPosition: [
        {id: 0, value: 'disabled', name: 'Choose intern position'}
    ],
    jobName: [],
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
        ...action.jobTypes
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
      action.positions.filter(job => job.Job_Type === 5)  
    ],
    positions: {
        ...state.positions,
        fullTime: [
            ...state.positions.fullTime,
            action.positions.filter(job => job.Job_Type === 1)
        ],
        project: [
            ...state.positions.project,
            action.positions.filter(job => job.Job_Type === 2)
        ],
        partTime: [
            ...state.positions.partTime,
            action.positions.filter(job => job.Job_Type === 3)
        ],
        freelance: [
            ...state.positions.freelance,
            action.positions.filter(job => job.Job_Type === 4)
        ],
    },
    jobName: [
        ...state.jobName,
        action.positions.filter(job => job.Job_Type !== 5)
    ],
    error: null,
    loading: false
});

const getJobPositionsFail = (state, action) => ({
    ...state,
    error: action.error.message,
    loading: false
});

const CandidatesReducer = (state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.FETCH_JOB_TYPE_LOADING: return loadJobTypes(state, action);
        case actionTypes.FETCH_JOB_TYPE_SUCCESS: return fetchJobTypesSuccess(state, action);
        case actionTypes.FETCH_JOB_TYPE_FAIL: return fetchJobTypesFail(state, action);
        case actionTypes.JOB_POSTIONS_LODING: return loadJobPositions(state, action);
        case actionTypes.FETCH_JOB_POSTIONS_SUCCESS: return getJobPositionsSuccess(state, action);
        case actionTypes.FETCH_JOB_POSTIONS_FAIL: return getJobPositionsFail(state, action);
        default:
            return state;
    };
};

export default CandidatesReducer;
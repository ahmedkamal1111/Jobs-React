import CompanyReducer from "./CompanyReducer";
import AuthReducer from './Admin/AuthReducer';
import PublicJobsReducer from "./PublicJobsReducer";
import CandidatesReducer from "./Admin/CandidatesReducer";

import { combineReducers } from 'redux';

export default combineReducers({
    company: CompanyReducer,
    auth: AuthReducer,
    jobs: PublicJobsReducer,
    candidate: CandidatesReducer 
});
import CompanyReducer from "./CompanyReducer";
import AuthReducer from './Admin/AuthReducer';
import PublicJobsReducer from "./PublicJobsReducer";

import { combineReducers } from 'redux';

export default combineReducers({
    company: CompanyReducer,
    auth: AuthReducer,
    jobs: PublicJobsReducer
});
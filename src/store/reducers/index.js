import CompanyReducer from "./CompanyReducer";
import AuthReducer from './AuthReducer';
import JobsReducer from "./JobsReducer";
import { combineReducers } from 'redux';

export default combineReducers({
    company: CompanyReducer,
    auth: AuthReducer,
    jobs: JobsReducer
});
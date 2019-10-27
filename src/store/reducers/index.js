import CompanyReducer from "./CompanyReducer";
import AuthReducer from './AuthReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    company: CompanyReducer,
    auth: AuthReducer
});
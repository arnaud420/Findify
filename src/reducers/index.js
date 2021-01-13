import { combineReducers } from 'redux';
import userReducer from './user';
import authReducer from './auth';

const combinedReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

export default combinedReducer;

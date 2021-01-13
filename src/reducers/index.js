import { combineReducers } from 'redux';
import userReducer from './user';
import authReducer from './auth';
import notifReducer from './notif';

const combinedReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  notif: notifReducer,
});

export default combinedReducer;

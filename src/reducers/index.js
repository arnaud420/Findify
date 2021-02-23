import { combineReducers } from 'redux';
import userReducer from './user';
import authReducer from './auth';
import notifReducer from './notif';
import modalReducer from './modal';

const combinedReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  notif: notifReducer,
  modal: modalReducer,
});

export default combinedReducer;

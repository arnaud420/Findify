import { combineReducers } from 'redux';
import userReducer from './user';
import authReducer from './auth';
import notifReducer from './notif';
import modalReducer from './modal';
import playlistReducer from './playlist';

const combinedReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  notif: notifReducer,
  modal: modalReducer,
  playlist: playlistReducer,
});

export default combinedReducer;

import Cookies from 'js-cookie';
import { AUTH_USER, UNAUTH_USER } from './type';
import { sendErrorNotif } from '../notif';
import setAuthorizationToken from '../../helpers/authorization';
import { getUser } from '../user';

export const authUser = (token) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_USER });
    setAuthorizationToken(token);
    await dispatch(getUser(token));
  } catch (error) {
    console.error('authUser error', error)
    Cookies.remove('access_token');
    setAuthorizationToken();
    dispatch({ type: UNAUTH_USER });
    dispatch(sendErrorNotif(error.response.data.data || error.message));
  }
};

export const unauthUser = () => (dispatch) => {
  try {
    Cookies.remove('access_token');
    setAuthorizationToken();
    dispatch({ type: UNAUTH_USER });
  } catch (error) {
    console.log('unauthUser error', error);
  }
}
import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  receiveCurrentUser,
  receiveErrors } from '../actions/session_actions';

import {
  login,
  logout,
  signup } from '../util/session_api_util';

export default ({ getState, dispatch }) => next => action => {
  const successCallback = user => {
    action.callback();
    return dispatch(receiveCurrentUser(user));
  };
  const errorCallback = xhr => {
    return dispatch(receiveErrors(xhr.responseJSON));
  };

  switch(action.type) {
    case LOGIN:
      login(action.user, successCallback, errorCallback);
      return next(action);
    case LOGOUT:
      logout(() => next(action));
      break;
    case SIGNUP:
      signup(action.user, successCallback, errorCallback);
      return next(action);
    default:
      return next(action);
  }
};

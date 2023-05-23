import {PROFILE_FAILURE, PROFILE_REQUEST, PROFILE_SUCCESS} from '../constants';

export const loginRequest = () => {
  return {
    type: PROFILE_REQUEST,
  };
};

export const loginSuccess = user => {
  console.log('user=========', user);
  return {
    type: PROFILE_SUCCESS,
    payload: user,
  };
};

export const loginFailure = error => {
  return {
    type: PROFILE_FAILURE,
    payload: error,
  };
};

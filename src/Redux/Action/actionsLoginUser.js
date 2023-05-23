import axios from 'axios';
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS} from '../constants';
import {BASE_URL} from '../../utils/Const';

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};


// export const actionsLoginUser = (email, password) => {
//   console.log(email, password);
//   return async dispatch => {
//     dispatch(loginRequest());
//     try {
//       const response = await axios.post(BASE_URL + `/User/userLoginApi`, {
//         email,
//         password,
//       });
//       dispatch(loginSuccess(response.data));
//     } catch (error) {
//       dispatch(loginFailure(error.response.data));
//     }
//   };
// };

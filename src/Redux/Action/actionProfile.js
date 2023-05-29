// import axios from 'axios';
// import {BASE_URL} from '../../utils/Const';
// import {PROFILE_FAILURE, PROFILE_REQUEST, PROFILE_SUCCESS} from '../constants';
// import {_getStorage} from '../../utils/Storage';

// export const loginRequest = () => {
//   return {
//     type: PROFILE_REQUEST,
//     payload: {},
//   };
// };

// export const loginSuccess = data => {
//   console.log('data-==========', data);
//   return {
//     type: PROFILE_SUCCESS,
//     payload: data,
//   };
// };

// export const loginFailure = error => {
//   return {
//     type: PROFILE_FAILURE,
//     payload: error,
//   };
// };

// export const _getProfile = async () => {
//   // const token = await _getStorage('token');
//   return async dispatch => {
//     dispatch(loginRequest());
//     try {
//       const response = await axios.get(
//         `https://jsonplaceholder.typicode.com/todos/1`,
//         // headers: {Authorization: `Bearer ${token}`},
//       );
//       const data = await response.json();
//       console.log('action data------->>>', data);
//       dispatch(fetchDataSuccess(data));
//     } catch (error) {
//       dispatch(fetchDataFailure(error.message));
//     }
//   };
// };

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
  payload:{}
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

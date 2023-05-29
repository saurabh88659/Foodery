

import axios from 'axios';
import {
  fetchDataFailure,
  fetchDataRequest,
  fetchDataSuccess,
} from './Action/actionProfile';
import { BASE_URL } from '../utils/Const';
import { _getStorage } from '../utils/Storage';

const url =
  'https://jsonplaceholder.typicode.com/todos/1'


export const fetchData = () => {
  // const token = await _getStorage('token')

    return async dispatch => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get(BASE_URL+`/User/getProfile`,{
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = response.data;
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

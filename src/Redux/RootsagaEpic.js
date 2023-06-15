import axios from 'axios';
import {
  fetchDataFailure,
  fetchDataRequest,
  fetchDataSuccess,
} from './Action/actionProfile';
import {BASE_URL} from '../utils/Const';
import {_getStorage} from '../utils/Storage';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

export const fetchData = () => {
  // const token = await _getStorage('token')

  return async dispatch => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get(BASE_URL + `/User/getProfile`, {
        // headers: {Authorization: `Bearer ${token}`},
      });
      const data = response.data;
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

const fetchApiData_wishlist = token => {
  return async dispatch => {
    dispatch({type: 'FETCH_API_DATA_REQUEST'});

    try {
      const response = await axios.get(BASE_URL + `/User/getWishlist1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      // return data;
      console.log('hey_______----------------->>>>', data.result.wishlists);
    } catch (error) {
      console.log('root saga api catch error', error);
      dispatch({type: 'FETCH_API_DATA_FAILURE', payload: error.message});
    }
  };
};

const cartdata_in_data_base = token => {
  return async dispatch => {
    // dispatch({type: 'FETCH_API_DATA_REQUEST'});

    try {
      const response = await axios.get(BASE_URL + `/User/getCart1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;

      return data;
    } catch (error) {
      console.log('root saga api catch error', error);
      // dispatch({type: 'FETCH_API_DATA_FAILURE', payload: error.message});
    }
  };
};

export {fetchApiData_wishlist, cartdata_in_data_base};

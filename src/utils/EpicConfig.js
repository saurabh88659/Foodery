import axios from 'axios';
import {_getUser_storage} from './Storage';
import {BASE_URL} from './Const';

// create a instance for axios

const Instance = axios.create({
  baseURL: BASE_URL,
});

const axios_header = () => {
  const userData = _getUser_storage();
  let HEADER = {
    Authorization: `Bearer ${userData?.access_token}`,
  };

  return HEADER;
};

// 👇👇👇 export someyhing we've created

export {Instance, axios_header};

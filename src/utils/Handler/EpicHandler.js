import {Instance} from '../EpicConfig';
// import {axios_header, Instance} from '../EpicConfig';

import {_getUser_storage} from '../Storage';

const _getOTP = async data => {
  try {
    const response = await Instance({
      url: '/User/userLoginApi',
      data: data,
      method: 'POST',
    });

    return response;
  } catch (error) {
    return error;
  }
};

export {_getOTP};

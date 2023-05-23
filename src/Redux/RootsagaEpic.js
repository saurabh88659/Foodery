// function* RootsagaEpic() {}

// export default RootsagaEpic;

import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS} from './constants';
import {BASE_URL} from '../utils/Const';

function* loginSaga(action) {
  try {
    const {email, password} = action.payload;
    const response = yield axios.post(BASE_URL + `/User/userLoginApi`, {
      email,
      password,
    });
    console.log('++++++++++++', response);
    yield put({type: LOGIN_SUCCESS, payload: response.data});
  } catch (error) {
    yield put({type: LOGIN_FAILURE, payload: error.response.data});
  }
}

function* rootSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

export default rootSaga;

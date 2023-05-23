import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../rootReducer';
import createSagaMiddleware from 'redux-saga';
import RootsagaEpic from '../RootsagaEpic';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(RootsagaEpic);
export default store;

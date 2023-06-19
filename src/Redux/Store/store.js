import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../rootReducer';
// import createSagaMiddleware from 'redux-saga';
// import RootsagaEpic from '../RootsagaEpic';
// import thunk from 'redux-thunk';
// import persistReducer from 'redux-persist/es/persistReducer';
// import { Storage } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

let persistedtReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  //   reducer: rootReducer,
  reducer: persistedtReducer,
  //   middleware: () => [sagaMiddleware],
});

// sagaMiddleware.run(RootsagaEpic);
export default store;

// import {applyMiddleware, createStore} from 'redux';
// import {createEpicMiddleware} from 'redux-observable';
// import thunk from 'redux-thunk';
// import rootReducer from '../rootReducer';
// import rootSaga from '../RootsagaEpic';
// import {persistReducer} from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const epicMiddleWares = createEpicMiddleware();

// const store = createStore(rootReducer, applyMiddleware(thunk));
// epicMiddleWares.run(rootSaga);
// export default store;

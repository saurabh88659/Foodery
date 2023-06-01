import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../rootReducer';
// import createSagaMiddleware from 'redux-saga';
// import RootsagaEpic from '../RootsagaEpic';
// import thunk from 'redux-thunk';

// const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
//   middleware: () => [sagaMiddleware],
});

// sagaMiddleware.run(RootsagaEpic);
export default store;

// import {applyMiddleware, createStore} from 'redux';
// // import {createEpicMiddleware} from 'redux-observable';
// import thunk from 'redux-thunk';
// import rootReducer from '../rootReducer';
// // import rootSaga from '../RootsagaEpic';
// // const epicMiddleWares = createEpicMiddleware();
// const store = createStore(rootReducer, applyMiddleware(thunk));
// // epicMiddleWares.run(rootSaga);
// export default store;

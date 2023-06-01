import {combineReducers} from 'redux';
import {reducer} from './reducer';
import wishlistReducer from './Reducers/wishlistReducer';
import locationReducer from '../Redux/Reducers/locationReducer';
import cartReducer from './Reducers/cartReducer';
import LoginUserReducer from '../Redux/Reducers/LoginUserReducer';
import geolocationReducer from '../Redux/Reducers/geolocationReducer';
import Profilereducer from './Reducers/Profilereducer';
import counterSlice from '../Redux/Store/counterSlice';
import CartReducerSlice from '../Redux/ReducerSlice/CartReducerSlice'

const rootReducer = combineReducers({
  reducer,
  wishlistReducer,
  locationReducer,
  cartReducer,
  LoginUserReducer,
  geolocationReducer,
  Profilereducer,
  counterSlice,
  CartReducerSlice
});

export default rootReducer;

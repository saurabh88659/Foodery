import {combineReducers} from 'redux';
import {reducer} from './reducer';
import wishlistReducer from './Reducers/wishlistReducer';
import locationReducer from '../Redux/Reducers/locationReducer';

const rootReducer = combineReducers({
  reducer,
  wishlistReducer,
  locationReducer,
});

export default rootReducer;

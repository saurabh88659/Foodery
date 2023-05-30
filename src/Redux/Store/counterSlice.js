import {createSlice, configureStore} from '@reduxjs/toolkit';

const initialState = {
  item: [],
};

export const counterSlice = createSlice({
  name: 'basket',
  initialState,

  reducers: {
    addtobasket: (state, action) => {
      state.item = [...state.item, action.payload];
    },
    removefrombasket: (state, action) => {
      state.value -= 1;
    },
  },
});

export const {addtobasket, removefrombasket} = counterSlice.actions;

export const selectBasketItem = state => state.basket.item;

export default counterSlice.reducer;

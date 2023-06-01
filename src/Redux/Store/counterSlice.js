// import {createSlice, configureStore} from '@reduxjs/toolkit';

// const initialState = {
//   item: [],
// };

// export const counterSlice = createSlice({
//   name: 'basket',
//   initialState,

//   reducers: {
//     addtobasket: (state, action) => {
//       state.item = [...state.item, action.payload];
//     },
//     removefrombasket: (state, action) => {
//       state.value -= 1;
//     },
//   },
// });

// export const {addtobasket, removefrombasket} = counterSlice.actions;

// export const selectBasketItem = state => state.basket.item;

// export default counterSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// export const cartSlice = createSlice({
//     name:"cart",
//     initialState:{
//         cart:[],
//     },
//     reducers:{
//         addToCart : (state,action) => {
//             const itemInCart = state.cart.find((item) => item.id == action.payload.id);
//             if(itemInCart){
//                 itemInCart.quantity++;
//             }else{
//                 state.cart.push({...action.payload,quantity:1})
//             }
//         },
//         removeFromCart : (state,action) => {
//             const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id);
//             state.cart = removeFromCart;
//         },
//         incrementQuantity : (state,action) => {
//             const itemInCart = state.cart.find((item) => item.id == action.payload.id);
//             itemInCart.quantity++;
//         },
//         decrementQuantity : (state,action) => {
//             const itemInCart = state.cart.find((item) => item.id == action.payload.id);
//             if(itemInCart.quantity == 1){
//                 const removeFromCart = state.cart.filter((item) => item.id !== action.payload.id);
//                 state.cart = removeFromCart;
//             }else{
//                 itemInCart.quantity--;
//             }

//         }
//     }
// });


// export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity} = cartSlice.actions;

// export default cartSlice.reducer;
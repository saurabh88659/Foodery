// export const ADD_ITEM = 'ADD_ITEM';
// export const INCREMENT_ITEM = 'INCREMENT_ITEM';
// export const DECREMENT_ITEM = 'DECREMENT_ITEM';

// export const addItem = item => ({
//    type: ADD_ITEM,
//   payload: item,
  
// });

// export const incrementItem = (itemId) => ({
//   type: INCREMENT_ITEM,
//   payload: itemId,
// });

// export const decrementItem = (itemId) => ({
//   type: DECREMENT_ITEM,
//   payload: itemId,
// });


export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';



export const increment = (id) => ({
  type: INCREMENT,
  payload: id,

});

export const decrement = (id) => ({
  type: DECREMENT,
  payload: id,
});
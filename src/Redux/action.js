import {ADD_TO_CART} from './constants';

export function addToCart(item) {
  console.log('hey', item);
  return {
    type: ADD_TO_CART,
    data: item,
  };
}

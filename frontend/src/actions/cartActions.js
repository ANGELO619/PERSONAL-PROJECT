import MockData from "../MockData";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_ITEM } from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const product = MockData.products[productId - 1];

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product,
      qty
    },
  });
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
};

export const updateCartItem = (item) => (dispatch, getState) => {
  dispatch({ type: CART_UPDATE_ITEM, payload: item });
};
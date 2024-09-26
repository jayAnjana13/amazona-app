import Axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../store";

//Action for addToCart
export const addToCart = (productId, qty) => async (dispatch) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  });
};

//removeFromCart
export const removeFromCart = (productId) => async (dispatch) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
};

//Shipping Address
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  // localStorage.setItem("shippingAddress", JSON.stringify(data))
};

//Payment method
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};

import axios from "axios";
import { CART_ADD_ITEMS, REMOVE_CART_ITEMS } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  console.log(data);
  dispatch({
    type: CART_ADD_ITEMS,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeFromCart = id => (dispatch, getState) => {
  console.log(`${id} from action`);
  dispatch({
    type: REMOVE_CART_ITEMS,
    payload: id
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

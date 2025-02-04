import { CART_ADD_ITEMS, REMOVE_CART_ITEMS } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEMS:
      const item = action.payload;
      const existItem = state.cartItems.find(x => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x
          )
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case REMOVE_CART_ITEMS:
      const productId = action.payload;
      console.log(`${action.payload} from reducer`);
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload)
      };
    default:
      return state;
  }
};

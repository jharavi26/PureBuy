export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProduct = state.cart.find((item) => item.id === action.payload.id);
      return {
        ...state,
        cart: existingProduct
          ? state.cart.map((item) =>
              item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
            )
          : [...state.cart, { ...action.payload, qty: 1 }]
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id)
      };

    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.id === action.payload.id ? { ...c, qty: action.payload.qty } : c
        )
      };

    default:
      return state;
  }
};

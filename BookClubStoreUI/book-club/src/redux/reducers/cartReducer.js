import { cartApi } from "../../api/cartApi";

const cartActionTypes = {
  SET_CART: "SET_CART",
  ADD_BOOK_TO_CART: "ADD_BOOK_TO_CART",
  DELTE_FROM_CART: "DELTE_FROM_CART"
};

let initialState = {
  cart: null,
  books: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartActionTypes.SET_CART:
      return {
        ...state,
        cart: action.payload,
        books: action.payload.books
      };
    case cartActionTypes.ADD_BOOK_TO_CART:
      return {
        ...state,
        books: [action.payload ,state.books]
      };
    case cartActionTypes.DELTE_FROM_CART:
      for (let i = 0; i < state.cart.books.length; i++) {
        if(state.cart.books[i].id === action.payload){
          state.cart.books.splice(i, 1);
        }
      }
      return {
        ...state
      };  
    default:
      return state;
  }
};

const setCartActionCreator = (cart) => {
  console.log("Action")
  console.log(cart)
  return {
    type: cartActionTypes.SET_CART,
    payload: cart
  };
};

const addBookToCartActionCreator = (book) => {
    return {
        type: cartActionTypes.ADD_BOOK_TO_CART,
        payload: book
    }
}

const deleteBookFromCartActionCreator = (bookId) => {
  return {
      type: cartActionTypes.DELTE_FROM_CART,
      payload: bookId
  }
}

export const getCartThunk = (userId, token) => {
  return (dispatch) => {
    cartApi.getCart(userId, token)
        .then(response => {
            console.log(response);
            dispatch(setCartActionCreator(response.data.data.cart))
        })
  };
};

export const addBookToCartThunk = (userId, bookId, token) => {
    return (dispatch) => {
      cartApi.addBookToCart(userId, bookId, token)
          .then(response => {
              console.log(response);
              //dispatch(addBookToCartActionCreator(response.data.data.addToCart))
              dispatch(getCartThunk(userId, token));
          })
    };
  };

export const deleteBookFromCartThunk = (userId, bookId, token) => {
    return (dispatch) => {
      cartApi.deleteBookFromCart(userId, bookId, token)
          .then(response => {
              console.log(response);
              //dispatch(deleteBookFromCartActionCreator(response.data.data.deleteFromCart.id));
              dispatch(getCartThunk(userId, token));
          })
    };
  };  
  
export default cartReducer;

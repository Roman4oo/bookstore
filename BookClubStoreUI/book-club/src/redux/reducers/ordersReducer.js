import { ordersApi } from "../../api/ordersApi";

const ordersActionTypes = {
  SET_ORDERS: "SET_ORDERS",
  SET_ORDER: "SET_ORDER",
  CREATE_ORDER: "CREATE_ORDER",
  SET_PAY_URL: "SET_PAY_URL"
};

let initialState = {
  orders: [],
  order: null,
  url: ""
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ordersActionTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case ordersActionTypes.SET_ORDER:
      return {
        ...state,
        order: action.payload
      };
    case ordersActionTypes.CREATE_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    case ordersActionTypes.SET_PAY_URL:
        console.log("reducer");
        console.log(action);
      return {
        ...state,
        url: action.payload
      };
    default:
      return state;
  }
};

const setOrdersActionCreator = (orders) => {
  return {
    type: ordersActionTypes.SET_ORDERS,
    payload: orders
  };
};

const setOrderActionCreator = (order) => {
    return {
      type: ordersActionTypes.SET_ORDER,
      payload: order
    };
  };

const createOrderActionCreator = (order) => {
    return {
      type: ordersActionTypes.CREATE_ORDER,
      payload: order
    };
  };

const setPayUrlActionCreator = (url) => {
    console.log(url)
    return {
      type: ordersActionTypes.SET_PAY_URL,
      payload: url
    };
  };

export const getOrdersThunk = (userId, token) => {
  return (dispatch) => {
    ordersApi.getUserOrders(userId, token)
        .then(response => {
            console.log(response)
            dispatch(setOrdersActionCreator(response.data.data.userOrders))
        })
  };
};

export const getOrderThunk = (orderId, token) => {
    return (dispatch) => {
      ordersApi.getOrderDetails(orderId, token)
          .then(response => {
              console.log(response)
              dispatch(setOrderActionCreator(response.data.data.orderDetails))
          })
    };
  };

export const createOrderThunk = (order, token) => {
    console.log(order);
    return (dispatch) => {
      ordersApi.createOrder(order, token)
          .then(response => {
              console.log(response)
              dispatch(createOrderActionCreator(response.data.data.createOrder))
              for(var i = 0; i<order.books.length; i++){
                  ordersApi.addBookToOrder(order.books[i], response.data.data.createOrder.id)
                    .then(res => {
                        console.log(res);
                    })
              }
          })
    };
  };

export const payThunk = (order) => {
    console.log(order);
    return dispatch => {
        ordersApi.createCheckout(order)
            .then(response => {
                console.log(response);
                dispatch(setPayUrlActionCreator(response.data.data.createCheckoutSession));
                window.location.href = response.data.data.createCheckoutSession;
            });
    }
} 
  
  export default ordersReducer;
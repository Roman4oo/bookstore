import { authApi } from "../../api/authApi";

const authActionTypes = {
  LOGIN: "LOGIN",
  SET_LOADING: "SET_LOADING",
};

let initialState = {
  token: "",
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActionTypes.LOGIN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      };
    default:
      return state;
  }
};

const loginActionCreator = (response) => {
  return {
    type: authActionTypes.LOGIN,
    payload: response,
  };
};

export const loginThunk = (email, password) => {
  return (dispatch) => {
    authApi.login(email, password).then((response) => {
      dispatch(loginActionCreator(response.data.data.login));
    });
  };
};

export default authReducer;

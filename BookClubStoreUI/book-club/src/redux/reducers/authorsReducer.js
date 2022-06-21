import { authorsApi } from "../../api/authorsApi";

const authorsActionTypes = {
  SET_AUTHORS: "SET_AUTHORS"
};

let initialState = {
  authors: []
};

const authorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case authorsActionTypes.SET_AUTHORS:
      return {
        ...state,
        authors: action.payload
      };
    default:
      return state;
  }
};

const setAuthorsActionCreator = (authors) => {
  return {
    type: authorsActionTypes.SET_AUTHORS,
    payload: authors
  };
};

export const getAuthorsThunk = (count) => {
  return (dispatch) => {
    authorsApi.getAuthors(0, count)
        .then(response => {
            dispatch(setAuthorsActionCreator(response.data.data.authors.items));
        })
  };
};

export const getSearchedAuthorsThunk = (search) => {
    return (dispatch) => {
      authorsApi.getSearchedAuthors(search)
          .then(response => {
              console.log(response);
              dispatch(setAuthorsActionCreator(response.data.data.authors.items));
          })
    };
  };

export default authorsReducer;

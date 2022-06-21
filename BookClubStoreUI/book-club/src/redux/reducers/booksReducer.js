import { booksApi } from "../../api/booksApi";
import { likesApi } from "../../api/likesApi";

const booksActionTypes = {
  SET_BOOKS: "SET_BOOKS",
  SET_BOOK: "SET_BOOK",
  ADD_LIKE: "ADD_LIKE",
  REMOVE_LIKE: "REMOVE_LIKE",
  ADD_DISLIKE: "ADD_DISLIKE",
  REMOVE_DISLIKE: "REMOVE_DISLIKE"
};

let initialState = {
  books: [],
  book: null,
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case booksActionTypes.SET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case booksActionTypes.SET_BOOK:
      return {
        ...state,
        book: action.payload,
      };
    case booksActionTypes.ADD_LIKE:
      state.books.forEach(book => {
        if(book.id === action.payload.bookId){
          book.likes.push(action.payload);
        }
      })
      return {
        ...state
      };
    case booksActionTypes.REMOVE_LIKE:
      state.books.forEach(book => {
        if(book.id === action.payload.bookId){
          for(var i = 0; i < book.likes.length; i++) {
            if(book.likes[i].id === action.payload.id) {
              book.likes.splice(i, 1);
            }
          } 
        }
      })
      return {
        ...state
      };
    case booksActionTypes.ADD_DISLIKE:
      state.books.forEach(book => {
        if(book.id === action.payload.bookId){
          book.disLikes.push(action.payload);
        }
      })
      return {
        ...state
      };
    case booksActionTypes.REMOVE_DISLIKE:
      state.books.forEach(book => {
        if(book.id === action.payload.bookId){
          for(var i = 0; i < book.disLikes.length; i++) {
            if(book.disLikes[i].id === action.payload.id) {
              book.disLikes.splice(i, 1);
            }
          } 
        }
      })
      return {
        ...state
      };
    default:
      return state;
  }
};

const setBooksActionCreator = (books) => {
  return {
    type: booksActionTypes.SET_BOOKS,
    payload: books,
  };
};

export const setBookActionCreator = (book) => {
    return {
      type: booksActionTypes.SET_BOOK,
      payload: book,
    };
  };

const addLikeActionCreator = (like) => {
  return {
    type: booksActionTypes.ADD_LIKE,
    payload: like
  };
}

const removeLikeActionCreator = (like) => {
  return {
    type: booksActionTypes.REMOVE_LIKE,
    payload: like
  };
}

const addDisLikeActionCreator = (disLike) => {
  return {
    type: booksActionTypes.ADD_DISLIKE,
    payload: disLike
  };
}

const removeDisLikeActionCreator = (disLike) => {
  return {
    type: booksActionTypes.REMOVE_DISLIKE,
    payload: disLike
  };
}

export const addLikeThunk = (like, token) => {
  return (dispatch) => {
    likesApi.addLike(like.userId, like.bookId, token)
      .then( response => {
        console.log(response);
        dispatch(addLikeActionCreator(response.data.data.addLike.like))
      })
  }
}

export const removeLikeThunk = (likeId, token) => {
  return (dispatch) => {
    likesApi.removeLike(likeId, token)
      .then(response => {
        console.log(response);
        dispatch(removeLikeActionCreator(response.data.data.removeLike));
      })
  }
}

export const addDisLikeThunk = (disLike, token) => {
  return (dispatch) => {
    likesApi.addDisLike(disLike.userId, disLike.bookId, token)
      .then( response => {
        console.log(response);
        dispatch(addDisLikeActionCreator(response.data.data.addDisLike))
      })
  }
}

export const removeDisLikeThunk = (disLikeId, token) => {
  return (dispatch) => {
    likesApi.removeDisLike(disLikeId, token)
      .then(response => {
        console.log(response);
        dispatch(removeDisLikeActionCreator(response.data.data.removeDisLike));
      })
  }
}

export const getBooByIdThunk = (id) => {
  return (dispatch) => {
    booksApi.getBookById(id)
    .then(response => {
      dispatch(setBookActionCreator(response.data.data.bookById));
    })
  }
}

export const getBooksThunk = (skip, take) => {
  return (dispatch) => {
    booksApi.getBooks(skip, take).then((response) => {
      console.log(response.data);
      dispatch(setBooksActionCreator(response.data.data.books.items));
    });
  };
};

export const getAuthorBooksThunk = (authorId) => {
  return (dispatch) => {
    booksApi.getAuthorBooks(authorId).then((response) => {
      dispatch(setBooksActionCreator(response.data.data.books.items));
    });
  };
};

export const getSearchedBooksThunk = (search) => {
  return (dispatch) => {
    booksApi.getSearchedBooks(search)
      .then(response => {
        dispatch(setBooksActionCreator(response.data.data.books.items));
      });
  };
};

export const getSortedBooks = (prop, desc) => {
  return (dispatch) => {
    booksApi.getSortedBooksByName(prop, desc)
      .then(response => {
        console.log(response);
        dispatch(setBooksActionCreator(response.data.data.books.items));
      });
  };
};

export default booksReducer;

import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAuthorBooksThunk } from "../../../redux/reducers/booksReducer";
import { getCartThunk } from "../../../redux/reducers/cartReducer";
import BookItem from "./BookItem";

const AuthorBooks = () => {
  var { authorId } = useParams();
  var dispatch = useDispatch();

  var user = useSelector(state => state.auth.user);
  var token = useSelector(state => state.auth.token)

  useEffect(() => {
    dispatch(getAuthorBooksThunk(authorId));
    dispatch(getCartThunk(user.id, token));
  }, [authorId, dispatch]);

  var state = useSelector((state) => state.books);
  var cart = useSelector(state => state.cart.cart);

  var books = state.books.map((book) => {
    return <BookItem cart={cart} key={book.id} book={book} />;
  });

  return (
    <>
      <Card border="primary" className="mt-3">
        <Card.Body>
          <Card.Title as="h4">{state.books[0].author.name}</Card.Title>
          <Card.Title as="h4">Кількість книг: {state.books.length}</Card.Title>
        </Card.Body>
      </Card>
      {books}
    </>
  );
};

export default AuthorBooks;

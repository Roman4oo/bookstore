import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCartThunk } from "../../redux/reducers/cartReducer";
import BookItem from "./Books/BookItem";
import { setBookActionCreator } from "../../redux/reducers/booksReducer";
import { createOrderThunk } from "../../redux/reducers/ordersReducer";

const Cart = () => {
  var dispatch = useDispatch();

  var user = useSelector((state) => state.auth.user);
  var token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log("useEffect");
    dispatch(getCartThunk(user.id, token));
  }, []);

  var cart = useSelector((state) => state.cart);

  var books =
    cart.cart !== null ? (
      cart.cart.books.map((book) => {
        return (
          <BookItem
            cart={cart.cart}
            key={book.id}
            book={book}
            showLikes={false}
          />
        );
      })
    ) : (
      <div>null</div>
    );


  const createOrder = () => {
    var order = {
      total: cart.cart.total,
      isPaid: false,
      userId: user.id,
      books: cart.cart.books
    }
    dispatch(createOrderThunk(order, token));
  }  
  return (
    <>
      <Card className="mt-3 mb-3" border="info">
        <Card.Body>
          <Card.Title>
            Сума: {cart.cart !== null ? cart.cart.total : "null"}
          </Card.Title>
        </Card.Body>
      </Card>
      {books}
      <div className="d-grid gap-2 mb-3">
        <Button onClick={createOrder} variant="info">
          Створити замовлення
        </Button>
      </div>
    </>
  );
};

export default Cart;

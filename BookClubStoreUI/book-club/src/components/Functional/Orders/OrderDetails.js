import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBooByIdThunk } from "../../../redux/reducers/booksReducer";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getOrderThunk, payThunk } from "../../../redux/reducers/ordersReducer";
import BookItem from "../Books/BookItem";
import { getCartThunk } from "../../../redux/reducers/cartReducer";
import { useNavigate } from "react-router-dom";


const OrderDetails = () => {
  var dispatch = useDispatch();
  let navigate = useNavigate();
  var user = useSelector(state => state.auth.user);
  var token = useSelector(state => state.auth.token);
  var order = useSelector((state) => state.orders.order);
  var url = useSelector((state) => state.orders.url);
  var cart = useSelector((state) => state.cart.cart);
  var { orderId } = useParams();

  useEffect(() => {
    dispatch(getCartThunk(user.id, token));
    dispatch(getOrderThunk(orderId));
  }, [orderId, dispatch]);

  const pay = () => {
      dispatch(payThunk(order));
      console.log(url);
      
  }

  return order !== null ? (
    <>
      <Card className="mt-3 mb-3" border="primary">
        <Card.Body>
            <Card.Title>
                Замовлення номер: {order.id}
            </Card.Title>
            <Card.Title>
                Дата створення: {new Date(order.createdDate).toLocaleString()}
            </Card.Title>
            <Card.Title>
                Сума: {order.total}
            </Card.Title>
            {order.isPaid
                ? <Card.Title>Оплачено</Card.Title>
                : <Card.Title>Неоплачено</Card.Title>}
        </Card.Body>
    </Card>
    {order.books.map(book => {
        return <BookItem cart={cart} key={book.id} book={book} showLikes={false}/>;
    })}
    </>
  ) : (
    <div>Loading</div>
  );
};

export default OrderDetails;

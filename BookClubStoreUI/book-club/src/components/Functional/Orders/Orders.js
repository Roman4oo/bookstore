import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { getOrdersThunk } from "../../../redux/reducers/ordersReducer";
import { Link } from "react-router-dom";

const Orders = () => {
  var dispatch = useDispatch();

  var user = useSelector((state) => state.auth.user);
  var token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getOrdersThunk(user.id, token));
  }, []);

  var orders = useSelector((state) => state.orders.orders);

  var ordersUI =
    orders !== null ? (
      orders.map((order) => {
        return (
          <Card className="mt-3 mb-3" border="primary">
            <Card.Body>
              <Link className="text-decoration-none"
                to={`/main/orders/${order.id}`}>
                <Card.Title>Замовлення номер: {order.id}</Card.Title>
              </Link>
              <Card.Title>
                Дата створення: {new Date(order.createdDate).toLocaleString()}
              </Card.Title>
              <Card.Title>Сума: {order.total}</Card.Title>
            </Card.Body>
          </Card>
        );
      })
    ) : (
      <div>Loading</div>
    );

  return <>{ordersUI}</>;
};

export default Orders;

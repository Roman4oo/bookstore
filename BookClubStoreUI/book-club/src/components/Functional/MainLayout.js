import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Header from "./Navbar";
import Navigation from "./Navigation";
import { Routes, Route } from "react-router-dom";
import Books from "./Books/Books";
import AuthorBooks from "./Books/AuthorBooks";
import BookDetails from "./Books/BookDetails";
import Authors from "./Authors";
import Cart from "./Cart";
import Orders from "./Orders/Orders";
import OrderDetails from "./Orders/OrderDetails";

const MainLayout = (props) => {
  const Profile = () => {
    return <div>Profile</div>;
  };
  
  var state = useSelector((state) => state.auth);
  
  return state.user !== null ? (
    <>
      <Header user={state.user} />

      <Container>
        <Row>
          <Col md={3}>
            <Navigation />
          </Col>
          <Col md={8}>
            <Routes>
              <Route path="profile" element={<Profile />} />
              <Route path="books" element={<Books />} />
              <Route path="authors" element={<Authors />} />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:orderId" element={<OrderDetails />} />
              <Route path="author/:authorId/books" element={<AuthorBooks/>}/>
              <Route path="books/:bookId/details" element={<BookDetails/>}/>
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <div>Auth error</div>
  );
};

export default MainLayout;

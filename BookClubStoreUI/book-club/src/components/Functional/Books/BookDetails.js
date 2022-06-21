import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBooByIdThunk } from "../../../redux/reducers/booksReducer";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const BookDetails = () => {
  var dispatch = useDispatch();

  var book = useSelector((state) => state.books.book);

  var { bookId } = useParams();

  useEffect(() => {
    dispatch(getBooByIdThunk(bookId));
  }, [bookId, dispatch]);

  return book !== null ? (
    <>
      <Card className="mt-3 mb-3">
        <Card.Body>
          <Row>
            <Col md={5}>
              <Card.Img
                style={{ width: "16rem" }}
                src={book.imageUrl}
              ></Card.Img>
            </Col>
            <Col>
              <Card.Title as="h4">
                <Link to={`/main/author/${book.author.id}/books`}>
                  {book.author.name}
                </Link>
              </Card.Title>
              <Card.Title>{book.name}</Card.Title>
              <Card.Text>Ціна: {book.price} грн.</Card.Text>
              <Button variant="info">Add to cart</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="mt-3 mb-3">
        <Card.Body>
            <Card.Title>Опис</Card.Title>
          <Card.Text>
              {book.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  ) : (
    <div>Loading</div>
  );
};

export default BookDetails;

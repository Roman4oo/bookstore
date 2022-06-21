import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./BookItem.css";
import {AiOutlineLike, AiFillLike, AiFillDislike, AiOutlineDislike} from 'react-icons/ai'
import { useDispatch, useSelector } from "react-redux";
import { addDisLikeThunk, addLikeThunk, removeDisLikeThunk, removeLikeThunk } from "../../../redux/reducers/booksReducer";
import { addBookToCartThunk, deleteBookFromCartThunk, getCartThunk } from "../../../redux/reducers/cartReducer";

const BookItem = (props) => {

  var dispatch = useDispatch();

  var [isLiked, setIsLiked] = useState(false);
  var [isDisLiked, setIsDisLiked] = useState(false);
  var [isInCart, setIsInCart] = useState(false);

    

  var user = useSelector(state => state.auth.user);
  var token = useSelector(state => state.auth.token);

  useEffect(() => {
    props.book.likes.forEach(element => {
      if(element.userId === user.id){
        setIsLiked(true);
      }
    });

    props.book.disLikes.forEach(element => {
      if(element.userId === user.id){
        setIsDisLiked(true);
      }
    });

    

  }, [])

  useEffect(() => {
    for (let i = 0; i < props.cart.books.length; i++) {
      if(props.book.id === props.cart.books[i].id){
        isInCart = setIsInCart(true);
      }
    }
  }, [isInCart])

  var likeClick = () => {
    props.book.disLikes.forEach(disLike => {
      if(disLike.userId === user.id){
        dispatch(removeDisLikeThunk(disLike.id, token))
        setIsDisLiked(false);
      }
    });
    var like = {
      userId: user.id,
      bookId: props.book.id
    };
    dispatch(addLikeThunk(like, token));
    setIsLiked(!isLiked);
  }

  var removeLikeClick = () => {
    props.book.likes.forEach(like => {
      if(like.userId === user.id) {
        dispatch(removeLikeThunk(like.id, token))
        setIsLiked(!isLiked);
      }
    })
  }

  var dislikeClick = () => {
    props.book.likes.forEach(like => {
      if(like.userId === user.id){
        dispatch(removeLikeThunk(like.id, token))
        setIsLiked(false);
      }
    });

    var disLike = {
      userId: user.id,
      bookId: props.book.id
    }
    dispatch(addDisLikeThunk(disLike, token));
    setIsDisLiked(!isDisLiked);
  }

  var removeDisLike = () => {
    props.book.disLikes.forEach(disLike => {
      if(disLike.userId === user.id) {
        dispatch(removeDisLikeThunk(disLike.id, token))
        setIsDisLiked(!isDisLiked);
      }
    })
  }

  var liked = isLiked
    ? <Button onClick={removeLikeClick} variant="outline-primary mr-3">
        <span> <AiFillLike size={30} /> {props.book.likes.length}</span>
      </Button>
    : <Button onClick={likeClick} variant="outline-primary mr-3">
        <span><AiOutlineLike size={30} /> {props.book.likes.length}</span>
      </Button>

  var disliked = isDisLiked
    ? <Button onClick={removeDisLike} variant="outline-primary mr-3">
        <span> <AiFillDislike size={30} /> {props.book.disLikes.length}</span>
      </Button>
    : <Button onClick={dislikeClick} variant="outline-primary mr-3">
        <span><AiOutlineDislike size={30} /> {props.book.disLikes.length}</span>
      </Button>


  
  const addBookToCart = () => {
    dispatch(addBookToCartThunk(user.id, props.book.id, token));
    setIsInCart(true);
  }

  const deleteBookFromCart = () => {
    dispatch(deleteBookFromCartThunk(user.id, props.book.id, token));
    setIsInCart(false);
  }

  return (
    <Card border="primary" className="mt-3 mb-3">
      <Card.Body>
        <Row>
          <Col md={5}>
            <Card.Img
              style={{ width: "12rem" }}
              src={props.book.imageUrl}
            ></Card.Img>
          </Col>
          <Col>
            <Card.Title as="h4">
              <Link className="text-decoration-none" to={`/main/author/${props.book.author.id}/books`}>
                {props.book.author.name}
              </Link>
            </Card.Title>
            <Card.Title>
              <Link className="text-decoration-none" to={`/main/books/${props.book.id}/details`}>
                {props.book.name}
              </Link>
            </Card.Title>
            <Card.Text>Ціна: {props.book.price} грн.</Card.Text>
            <Card.Text>
              {isInCart 
                ? <Button onClick={deleteBookFromCart} variant="outline-primary">Delete from cart</Button>
                : <Button onClick={addBookToCart} variant="outline-primary">Add to cart</Button>}
            </Card.Text>
            {props.showLikes ? <Card.Text>
              {liked}
              {disliked}
            </Card.Text> : <div></div>}
            
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BookItem;

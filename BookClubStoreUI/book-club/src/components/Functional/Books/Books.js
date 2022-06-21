import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBooksThunk,
  getSearchedBooksThunk,
  getSortedBooks,
} from "../../../redux/reducers/booksReducer";
import BookItem from "./BookItem";
import {FaSortAmountDownAlt, FaSortAmountDown} from 'react-icons/fa'
import {AiOutlineSearch} from 'react-icons/ai'
import { Button, FormControl, InputGroup, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { getCartThunk } from "../../../redux/reducers/cartReducer";

const Books = () => {
  var dispatch = useDispatch();
  var [count, setCount] = useState(10);

  var [desc, setDesc] = useState(false);
  var [sortedBy, setSortedBy] = useState("description");

  var user = useSelector(state => state.auth.user);
  var token = useSelector(state => state.auth.token);
  var cart = useSelector(state => state.cart.cart)

  
  useEffect(() => {
    dispatch(getCartThunk(user.id, token));
    dispatch(getBooksThunk(0, count));
  }, [])

  useEffect(() => {
    dispatch(getBooksThunk(0, count));
  }, [count, dispatch]);

  const load = () => {
    setCount(count + 10);
  };

  var [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getSearchedBooksThunk(search));
  }, [search, dispatch])

  const changeDesc = () => {
    setDesc(!desc);
    //console.log(desc)
    //dispatch(getSortedBooks(sortedBy, desc));
  }

  const sortByName = () => {
    setSortedBy("name");
    setDesc(false);
  }

  const sortByPrice = () => {
    setSortedBy("price");
    setDesc(false);
  }

  useEffect(() => {
      dispatch(getSortedBooks(sortedBy, desc))
  }, [sortedBy, dispatch])

  useEffect(() => {
      dispatch(getSortedBooks(sortedBy, desc))
  }, [desc, dispatch])

  var descButton = desc
    ? (<Button onClick={changeDesc} variant="outline-primary" id="button-addon2">
    <FaSortAmountDownAlt />
  </Button>)
    : (<Button onClick={changeDesc} variant="outline-primary" id="button-addon2">
    <FaSortAmountDown />
  </Button>)

  var state = useSelector((state) => state.books);
  var books = cart !== null 
    ? state.books.map((book) => {
    
    return <BookItem cart={cart} key={book.id} book={book} showLikes={true}/>;
  })
    : <div>Loading</div>;
  return (
    <>
      <InputGroup className="mt-3 mb-3">
        <DropdownButton
          as={ButtonGroup}
          title="Сортувати"
          id="bg-nested-dropdown"
        >
          <Dropdown.Item onClick={sortByPrice} eventKey="1">За ціною</Dropdown.Item>
          <Dropdown.Item onClick={sortByName} eventKey="2">За ім'ям</Dropdown.Item>
        </DropdownButton>
        {descButton}
        <AiOutlineSearch color="white" size={45} />
        <FormControl
          value={search}
          onChange={(event) => setSearch(event.target.value)} //{(event) => setSearch(event.target.value)}
          size="lg"
          type="text"
          placeholder="Пошук"
        />
      </InputGroup>

      {books}

      <div className="d-grid gap-2 mb-3">
        <Button onClick={load} variant="primary">
          Ще
        </Button>
      </div>
    </>
  );
};

export default Books;

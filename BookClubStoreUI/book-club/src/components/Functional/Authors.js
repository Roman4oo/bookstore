import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthorsThunk,
  getSearchedAuthorsThunk,
} from "../../redux/reducers/authorsReducer";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdOutlinePersonSearch } from "react-icons/md";

const Authors = () => {
  var dispatch = useDispatch();
  var [count, setCount] = useState(10);

  useEffect(() => {
    dispatch(getAuthorsThunk(count));
  }, [count, dispatch]);

  const load = () => {
    setCount(count + 10);
  };

  var [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getSearchedAuthorsThunk(search));
  }, [search, dispatch]);

  var authors = useSelector((state) => state.authors.authors);

  return (
    <>
      <InputGroup className="mt-3 mb-3">
        <MdOutlinePersonSearch color="white" size={45}/>

        <FormControl
          className="ml-5"
          value={search}
          onChange={(event) => setSearch(event.target.value)} //{(event) => setSearch(event.target.value)}
          size="lg"
          type="text"
          placeholder=""
        />
      </InputGroup>

      {authors.map((author) => {
        return (
          <Card border="info" className="mt-3 mb-3" >
            <Card.Body>
              <Link
                className="text-decoration-none"
                to={`/main/author/${author.id}/books`}
              >
                <Card.Title as="h4">{author.name}</Card.Title>
              </Link>
              <Card.Title as="h4">
                Кількість книг: {author.books.length}
              </Card.Title>
            </Card.Body>
          </Card>
        );
      })}

      <div className="d-grid gap-2 mb-3">
        <Button className="btn btn-info" onClick={load} variant="primary">
          Ще
        </Button>
      </div>
    </>
  );
};

export default Authors;

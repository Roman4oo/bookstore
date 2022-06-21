import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
import {AiOutlineUser, AiOutlineBook, AiOutlineUsergroupDelete, AiOutlineShoppingCart} from 'react-icons/ai'
import {RiFileList2Line} from 'react-icons/ri'

const Navigation = () => {
  return (
    <Nav className="flex-column mt-3">
      <Link className="text-decoration-none" to="books">
        <div className="d-grid gap-2">
          <Button variant="outline-info"><AiOutlineBook size={30} color="white"/>  Books</Button>
        </div>
      </Link>
      <Link className="text-decoration-none" to="authors">
        <div className="d-grid gap-2">
          <Button variant="outline-info"><AiOutlineUsergroupDelete size={30} color="white"/>  Authors</Button>
        </div>
      </Link>
      <Link className="text-decoration-none" to="cart">
        <div className="d-grid gap-2" style={{ color: '#FFF' }}>
          <Button variant="outline-info"><AiOutlineShoppingCart size={30} color="white"/>  Cart</Button>
        </div>
      </Link>
      <Link className="text-decoration-none" to="orders">
        <div className="d-grid gap-2">
          <Button variant="outline-info"><RiFileList2Line size={30} color="white"/>  Orders</Button>
        </div>
      </Link>
    </Nav>
  );
};

export default Navigation;

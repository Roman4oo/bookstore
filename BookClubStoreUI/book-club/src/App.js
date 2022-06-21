import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Functional/MainLayout";
import Login from "./components/Functional/Login";
import Register from "./components/Functional/Register";
import background from "./background.png";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/main/*" element={<MainLayout />}/>
          
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

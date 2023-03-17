import './App.css';
import React from "react";
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Transaction from './Components/Transactions/Transaction';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/login" element={<Login/>} ></Route>
          <Route exact path="/register" element={<Register/>} ></Route>
          <Route exact path="/transactions" element={<Transaction/>} ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

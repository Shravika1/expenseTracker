import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className='navbar' >
        <Link className='navlink' to="/" >Home</Link>
        <Link className='navlink' to="/login" >login</Link>
        <Link className='navlink' to="/register" >register</Link>
        <Link className='navlink' to="/transactions">MyTransactions</Link>
    </nav> 
  )
}

export default NavBar
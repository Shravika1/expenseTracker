import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    
  return (
    <div className='home' >
        <div className="home_container">
          <h1>Expense Tracker</h1>
          <div className="home_links">
            <Link className='home_link' to="/login" >Login</Link>
            <Link className='home_link' to="/register" >register</Link>
          </div>
        </div>
    </div>
  )
}

export default Home;

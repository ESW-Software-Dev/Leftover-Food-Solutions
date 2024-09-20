import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/post">Post Food</Link>
      <Link to="/search">Search Food</Link>
      <Link to="/about">About</Link>
    </nav>
  );
};

export default Navbar;




import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for active link
import '../App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink exact to="/" activeClassName="active">Home</NavLink>
      <NavLink to="/post" activeClassName="active">Post Food</NavLink>
      <NavLink to="/search" activeClassName="active">Search Food</NavLink>
      <NavLink to="/about" activeClassName="active">About</NavLink>
    </nav>
  );
};

export default Navbar;







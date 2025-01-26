import React from 'react';
import { NavLink } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import '../App.css';

const Navbar = ({ user, handleLogout }) => {
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
import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for active link
import '../App.css';

const Navbar = ({ user }) => {
  return (
    <nav className="navbar">
      <NavLink exact to="/" activeClassName="active">Home</NavLink>
      <NavLink to="/post" activeClassName="active">Post Food</NavLink>
      <NavLink to="/search" activeClassName="active">Search Food</NavLink>
      <NavLink to="/about" activeClassName="active">About</NavLink>
      {user && (
        <div>
          <span>{user.name}</span>
          <img src={user.picture} alt={user.name} style={{ width: '40px', borderRadius: '20px' }} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;







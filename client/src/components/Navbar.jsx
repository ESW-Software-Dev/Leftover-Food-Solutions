import React from "react";
import { NavLink } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "../App.css";

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="navbar">
      <img src="../dist/logo.png"></img>
      <NavLink exact to="/" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/post" activeClassName="active">
        Post
      </NavLink>
      <NavLink to="/profile" activeClassName="active">
        Profile
      </NavLink>
      <NavLink to="/about" activeClassName="active">
        About
      </NavLink>
    </nav>
  );
};

export default Navbar;

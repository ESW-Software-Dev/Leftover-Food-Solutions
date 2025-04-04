import React from "react";
import {
  FaHome,
  FaSearch,
  FaEnvelope,
  FaPlus,
  FaUser,
  FaEllipsisH,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
        <span>FS</span>
      </div>
      <ul>
        <li>
          <FaHome /> Home
        </li>
        <li className="active">
          <FaSearch /> Search
        </li>
        <li>
          <FaEnvelope /> Messages
        </li>
        <li>
          <FaPlus /> Post
        </li>
        <li>
          <FaUser /> Profile
        </li>
        <li>
          <FaEllipsisH /> About
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

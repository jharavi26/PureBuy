import React, { useState } from "react";
import { FaUser, FaShoppingCart, FaCog, FaQuestionCircle, FaBars } from "react-icons/fa";
import "./Sidebar.css"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </div>
      <ul className="sidebar-list">
        <li>
          <FaUser /> <span className="sidebar-text">User Details</span>
        </li>
        <li>
          <FaShoppingCart /> <span className="sidebar-text">Orders</span>
        </li>
        <li>
          <FaCog /> <span className="sidebar-text">Settings</span>
        </li>
        <li>
          <FaQuestionCircle /> <span className="sidebar-text">Help</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

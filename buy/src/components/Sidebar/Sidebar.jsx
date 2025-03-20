import React, { useState } from "react";
import { FaUser, FaShoppingCart, FaCog, FaQuestionCircle, FaBars  } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Authentication/firebase";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // ✅ Close sidebar after navigation (improves UX)
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // ✅ Logout from Firebase
      window.location.reload(); // ✅ Force re-render
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSetting = ()=>{
    navigate("/setting")
  }

  const handleHelp = ()=>{
    navigate("/help")
  }

  const handleProfile = ()=>{
    navigate("/userprofile")
  }

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </div>
      <ul className="sidebar-list">
        <li onClick={handleProfile}>
          <FaUser /> <span className="sidebar-text">User Details</span>
        </li>
        <li onClick={handleSetting}>
          <FaCog /> <span className="sidebar-text">Settings</span>
        </li>
        <li onClick={handleHelp}>
          <FaQuestionCircle /> <span className="sidebar-text">Help</span>
        </li>
        <li onClick={handleLogout} >
          <IoMdLogOut /> <span className="sidebar-text">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import "./Profile.css";
import Product from '../components/products/Product';

function Profile() {
  return (
    <div className="profile-container">
      <Sidebar />

      <div className="header">
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <CiSearch size={20} className="search-icon" />
        </div>
        <IoCartOutline size={40} className="cart-icon" />
      </div>
      <Product/>
    </div>
  );
}

export default Profile;

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { CiSearch } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";  // ✅ Import Link
import "./Profile.css";
import Product from '../components/products/Product';
import { useCart } from '../components/context/Context';
import { Badge } from 'primereact/badge';

function Profile() {
  const [open, setOpen] = useState(false);  // ✅ Initialize as false
  const { state: { cart }, dispatch } = useCart();  // ✅ Also extract dispatch

  const handleCart = () => {
    if (cart.length > 0) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <>
      <div className="profile-container">
        <Sidebar />

        <div className="header">
          <div className="search-box">
            <input type="text" placeholder="Search" />
            <CiSearch size={20} className="search-icon" />
          </div>

          {/* ✅ Fix: Call handleCart correctly */}
          <IoCartOutline size={40} className="cart-icon" onClick={handleCart} />
          
          <Badge value={cart.length}></Badge>
        </div>
      </div>

      <Product />

      {open ? (
        <div className='add'>
          {cart.map((item) => (
            <span className='cartitem' key={item.id}>
              <img src={item.thumbnail} className='cartimage' alt={item.title} />
              <div className='cartDetails'>
                <span>{item.category}</span>
                <span>{Math.floor(item.price)}</span>
              </div>
              
              {/* ✅ Fix: Ensure AiFillDelete is imported */}
              <AiFillDelete 
                style={{ fontSize: "20px", cursor: "pointer", color: "black" }}
                onClick={() => {
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: item,
                  });
                }}
              />
            </span>
          ))}

          <Link to={"/cart"}>
            <button style={{ width: "90%", fontSize: "14px", marginLeft: "10px", backgroundColor: "blue", color: "white" }}>
              Go to Cart
            </button>
          </Link>
        </div>
      ) : null}
    </>
  );
}

export default Profile;

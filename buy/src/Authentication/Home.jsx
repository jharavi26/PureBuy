import React from 'react';
import Logo from "../assets/Images/Logo.jpg";
import { Outlet, Link } from "react-router-dom";
import "./Home.css"

function Home() {
  return (
    <div className='container'>
       <div className='header'>
      <img src = {Logo} alt = "Logo-Image" /> 
      <h1>Welcome to PureBuy</h1>
      <Link to="/register">
        <button className='start'>Lets get Started</button>
      </Link>
      </div>

      <Outlet />

    </div>
  )
}

export default Home

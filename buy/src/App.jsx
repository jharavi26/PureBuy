import React, { useEffect, useState } from 'react';
import {BrowserRouter , Routes, Route , Navigate} from "react-router-dom"
import Login from './Authentication/Login';
import Profile from './Authentication/Profile';
import Register from './Authentication/Register';
import { auth } from './Authentication/firebase';
import Home from './Authentication/Home';



function App() {

  const [user, setUser] = useState();

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user)
    }); 
  },[])

  return (
  
    <div className='app'>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />}>
        <Route path = "register" element = {<Register/>}/>
        </Route>
        {/* <Route path='/' element = {user ? <Navigate to = "/profile"/> : <Login/>}/> */}
        <Route path = "/login" element = {<Login/>} />
        <Route path = "/profile" element = {<Profile/>} />

      </Routes>
      </BrowserRouter>
      
    </div>


  )
}

export default App

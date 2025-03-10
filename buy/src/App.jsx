import React, { useEffect, useState } from 'react';
import {BrowserRouter , Routes, Route , Navigate} from "react-router-dom"
import Login from './Authentication/Login';
import Profile from './Authentication/Profile';
import Register from './Authentication/Register';
import { auth } from './Authentication/firebase';
import Home from './Authentication/Home';



function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup function to prevent memory leaks
  }, []);

  return (
  
    <div className='app'>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={user ? <Navigate to="/profile" /> : <Home />} />
          <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/profile" /> : <Register />} />
          
          {/* Protect Profile Route */}
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
       
      </Routes>
      </BrowserRouter>
      
    </div>


  )
}

export default App

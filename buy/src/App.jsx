import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Authentication/Login";
import Profile from "./Authentication/Profile";
import Register from "./Authentication/Register";
import { auth } from "./Authentication/firebase";
import Home from "./Authentication/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import Setting from "./components/Sidebar/Setting";
import Cart from "./components/products/Cart";
import Help from "./components/Sidebar/Help";
import Success from "./components/UI/Success";
import Cancel from "./components/UI/Cancel";
import UserProfile from "./components/Sidebar/UserProfile";


function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup function to prevent memory leaks
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/profile" /> : <Home />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/profile" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/profile" /> : <Register />}
          />

          {/* ✅ Fixed Profile Route (Removed Duplicate) */}
          <Route
            path="/profile"
            element={
              user ? (
                <>
                  <Sidebar />
                  <Profile />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* ✅ Settings Route (No authentication check) */}
          <Route
            path="/setting"
            element={
              <>
                <Sidebar />
                <Setting />
                
              </>
            }
          />

          <Route
            path="/help"
            element={
              <>
                <Sidebar />
                <Help />
                
              </>
            }
          />
           <Route
            path="/userprofile"
            element={
              <>
                <Sidebar />
                <UserProfile/>
                
              </>
            }
          />
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path = "/success" element = {<Success/>}></Route>
          <Route path = "/cancel" element = {<Cancel/>}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { NavLink } from "react-router-dom"; // Import NavLink
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import "./Register.css";
import Toast from "../components/UI/Toast";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        photo: "",
      });

      setToastType("success");
      setToastMessage("User Registered Successfully!");
      console.log("User Registered Successfully!!");

    } catch (error) {
      setToastType("error");
      setToastMessage(error.message);
      setError(error.message);
      console.error("Registration Error:", error.message);
    }
  };

  return (
    <div className="register-container">
      {toastMessage && <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage("")} />}

      <form onSubmit={handleRegister} className="register-form">
        <h3>Sign Up</h3>

        {error && <p className="error-message">{error}</p>}

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>

        {/* ✅ Updated NavLink instead of <a> */}
        <p className="forgot-password text-right">
          Already registered? <NavLink to="/login">Login</NavLink>
        </p>
      </form>
    </div>
  );
}

export default Register;

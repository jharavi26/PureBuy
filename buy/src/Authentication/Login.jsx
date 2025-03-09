import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate , NavLink } from "react-router-dom"; // React Router for navigation
import { auth } from "./firebase";
import "./Login.css";
import SignInwithGoogle from "./SignInwithGoogle";
import Toast from "../components/UI/Toast";




function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // "success" or "error"
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous error

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setToastType("success");
      setToastMessage("User logged in successfully!");

      // Redirect after toast disappears
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      setToastType("error");
      setToastMessage(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      {/* Show Toast Notification */}
      {toastMessage && <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage("")} />}

      <form onSubmit={handleSubmit} className="login-form">
        <h3>Login</h3>

        {error && <p className="error-message">{error}</p>} {/* Show errors */}

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
            Submit
          </button>
        </div>

        <p className="forgot-password text-right">
          New user? <NavLink to ="/register">Register Here</NavLink>
        </p>

        <SignInwithGoogle />
      </form>
    </div>
  );
}

export default Login;

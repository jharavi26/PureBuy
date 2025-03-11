import React, { useState } from "react";
import "./Setting.css"
import { useNavigate } from "react-router-dom";


const Settings = () => {
  const [username, setUsername] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const navigate = useNavigate();


  // Handle Profile Picture Upload
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  // Handle Dark Mode Toggle
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  // Handle Save Settings
  const handleSave = () => {
    navigate("/profile");

  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      {/* Profile Picture */}
      <div className="profile-section">
        <img src={profilePic || "https://via.placeholder.com/100"} alt="Profile" />
        <input type="file" accept="image/*" onChange={handleProfilePicChange} />
      </div>

      {/* Username Change */}
      <div className="input-group">
        <label>Change Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Dark Mode Toggle */}
      <div className="input-group">
        <label>Dark Mode:</label>
        <input type="checkbox" checked={darkMode} onChange={handleDarkModeToggle} />
      </div>

      {/* Password Update */}
      <div className="input-group">
        <label>New Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleSave} className="save-btn">Save Changes</button>
    </div>
  );
};

export default Settings;

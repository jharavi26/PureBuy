import React, { useState, useEffect } from "react";
import "./Toast.css"; // Import styles

const Toast = ({ message, type = "success", onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose(); // Hide toast after timeout
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return visible ? <div className={`toast ${type}`}>{message}</div> : null;
};

export default Toast;

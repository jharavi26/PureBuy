import React from "react";
import "./Help.css";
import { FaPhoneAlt, FaEnvelope, FaQuestionCircle, FaTruck, FaUndo } from "react-icons/fa";

const Help = () => {
  return (
    <div className="help-container">
      <h2>Help & Support</h2>
      
      {/* FAQ Section */}
      <div className="help-section">
        <h3><FaQuestionCircle /> Frequently Asked Questions</h3>
        <details>
          <summary>How can I track my order?</summary>
          <p>You can track your order in the "My Orders" section of your account or use the tracking link sent to your email.</p>
        </details>
        <details>
          <summary>What is your return policy?</summary>
          <p>You can return products within 30 days of delivery. Visit our <a href="/returns">Return Policy</a> page for details.</p>
        </details>
        <details>
          <summary>How do I contact customer support?</summary>
          <p>You can reach us via live chat, email, or phone (details below).</p>
        </details>
      </div>

      {/* Order & Returns Section */}
      <div className="help-section">
        <h3><FaTruck /> Order & Shipping</h3>
        <p>Need help with your order? <a href="/track-order">Track your order</a> or check estimated delivery dates.</p>
      </div>

      <div className="help-section">
        <h3><FaUndo /> Returns & Refunds</h3>
        <p>Find out how to return items and get a refund. <a href="/returns">Return an item</a></p>
      </div>

      {/* Contact Section */}
      <div className="help-section contact-section">
        <h3>Contact Us</h3>
        <p><FaPhoneAlt /> Phone: <a href="tel:+18001234567">+1 800 123 4567</a></p>
        <p><FaEnvelope /> Email: <a href="mailto:support@ecommerce.com">support@ecommerce.com</a></p>
      </div>
    </div>
  );
};

export default Help;

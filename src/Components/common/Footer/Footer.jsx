import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
return ( <footer className="rd-footer">

  <div className="rd-footer-container">

    {/* Company Information */}
    <div className="rd-footer-section">
      <h3 className="rd-footer-logo">
        Recurring Deposit System
      </h3>

      <p className="rd-footer-description">
        Secure and scalable platform for managing recurring deposits,
        customer accounts, agents, transactions and scheme management.
        Built to provide a safe and reliable banking experience.
      </p>
    </div>

    {/* Quick Links */}
    <div className="rd-footer-section">
      <h4>Quick Links</h4>

      <ul>
        <li>
          <Link to="/schemes">Schemes</Link>
        </li>

        <li>
          <Link to="/company-profile">Company Profile</Link>
        </li>

        <li>
          <Link to="/contact-us">Contact Us</Link>
        </li>
      </ul>
    </div>

    {/* Services */}
    <div className="rd-footer-section">
      <h4>Our Services</h4>

      <ul>
        <li>Recurring Deposit Accounts</li>
        <li>Scheme Management</li>
        <li>Customer Management</li>
        <li>Secure Transactions</li>
      </ul>
    </div>

    {/* Contact */}
    <div className="rd-footer-section">
      <h4>Contact</h4>

      <p>Email: support@rdsystem.com</p>
      <p>Phone: +91 98765 43210</p>
      <p>Mumbai, Maharashtra</p>
    </div>

  </div>

  {/* Footer Bottom */}
  <div className="rd-footer-bottom">

    <div className="rd-footer-policy">
      <span>Privacy Policy</span>
      <span>Terms & Conditions</span>
      <span>Security Policy</span>
    </div>

    <p>
      © 2026 Recurring Deposit System. All Rights Reserved.
    </p>

  </div>

</footer>

);
}

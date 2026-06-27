import React from "react";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="company-profile-container">

      <div className="company-profile-banner">
        <h1>Recurring Deposit System</h1>
        <p>
          Secure • Reliable • Digital Savings Platform
        </p>
      </div>

      <div className="company-profile-content">

        <div className="company-profile-card">
          <h2>About Company</h2>

          <p>
            Recurring Deposit System is a modern financial
            platform designed to simplify recurring deposit
            account management. Our system enables customers,
            agents, and administrators to manage deposits,
            schemes, transactions, and account operations
            efficiently through a secure digital platform.
          </p>
        </div>

        <div className="company-profile-card">
          <h2>Our Mission</h2>

          <p>
            To provide customers with a secure, transparent,
            and easy-to-use platform for recurring deposit
            investments while ensuring reliability and trust
            in every transaction.
          </p>
        </div>

        <div className="company-profile-card">
          <h2>Our Vision</h2>

          <p>
            To become a leading digital savings management
            platform by offering innovative financial
            solutions and exceptional customer experience.
          </p>
        </div>

        <div className="company-profile-stats">

          <div className="company-stat-box">
            <h3>1000+</h3>
            <span>Customers</span>
          </div>

          <div className="company-stat-box">
            <h3>100+</h3>
            <span>Agents</span>
          </div>

          <div className="company-stat-box">
            <h3>50+</h3>
            <span>RD Schemes</span>
          </div>

          <div className="company-stat-box">
            <h3>99.9%</h3>
            <span>Security</span>
          </div>

        </div>

        <div className="company-profile-card">
          <h2>Services Offered</h2>

          <ul className="company-service-list">
            <li>Recurring Deposit Account Management</li>
            <li>Customer Registration & Verification</li>
            <li>Agent Management</li>
            <li>Deposit Tracking</li>
            <li>Transaction History</li>
            <li>Reports & Analytics</li>
            <li>Scheme Management</li>
          </ul>
        </div>

        <div className="company-profile-card">
          <h2>Contact Information</h2>

          <div className="company-contact-info">
            <p>
              <strong>Email:</strong>
              support@rdsystem.com
            </p>

            <p>
              <strong>Phone:</strong>
              +91 98765 43210
            </p>

            <p>
              <strong>Location:</strong>
              Mumbai, Maharashtra, India
            </p>

            <p>
              <strong>Working Hours:</strong>
              Monday - Saturday (9:00 AM - 6:00 PM)
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
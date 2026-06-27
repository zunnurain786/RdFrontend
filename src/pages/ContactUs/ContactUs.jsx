import React, { useState } from "react";
import "./ContactUs.css";

export default function ContactUs() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Message Sent Successfully");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="rd-contact-page">

      <div className="rd-contact-header">
        <h2>Contact Us</h2>
        <p>
          We'd love to hear from you.
          Send us your questions or feedback.
        </p>
      </div>

      <div className="rd-contact-container">

        {/* Left Side */}

        <div className="rd-contact-info">

          <h3>Get In Touch</h3>

          <div className="rd-contact-item">
            <h4>Address</h4>
            <p>Mumbai, Maharashtra, India</p>
          </div>

          <div className="rd-contact-item">
            <h4>Email</h4>
            <p>support@rdsystem.com</p>
          </div>

          <div className="rd-contact-item">
            <h4>Phone</h4>
            <p>+91 98765 43210</p>
          </div>

          <div className="rd-contact-item">
            <h4>Working Hours</h4>
            <p>Monday - Saturday</p>
            <p>09:00 AM - 06:00 PM</p>
          </div>

        </div>

        {/* Right Side */}

        <div className="rd-contact-form-card">

          <form onSubmit={handleSubmit}>

            <div className="rd-form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="rd-form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="rd-form-group">
              <label>Subject</label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="rd-form-group">
              <label>Message</label>

              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="rd-contact-btn"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}
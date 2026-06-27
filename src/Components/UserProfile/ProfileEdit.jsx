import React, { useState } from "react";
import "./ProfileEdit.css";
import { toast } from "react-toastify";

export default function ProfileEdit({ onClose }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [formData, setFormData] =
    useState({
      userId:
        user?.userId || "",

      fullName:
        user?.fullName || "",

      email:
        user?.email || "",

      mobileNumber:
        user?.mobileNumber || "",

      role:
        user?.role || "",

      active:
        user?.active || false,

      createdAt:
        user?.createdAt || ""
    });

  const handleChange = (e) => {

    const { name, value, type, checked } =
      e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    /*
      API CALL HERE
    */

    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        ...formData
      })
    );

    toast.success(
      "Profile Updated Successfully"
    );

    setTimeout(() => {
      onClose();

      window.location.reload();
    }, 1000);
  };

  return (
    <div className="edit-profile-overlay">

      <div className="edit-profile-modal">

        <button
          className="edit-close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="edit-header">
          <h2>Edit Profile</h2>
          <p>
            Update your account details
          </p>
        </div>

        <form
          className="edit-form"
          onSubmit={handleSubmit}
        >

          <div className="edit-group">
            <label>User ID</label>

            <input
              type="text"
              value={formData.userId}
              disabled
            />
          </div>

          <div className="edit-group">
            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="edit-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="edit-group">
            <label>Mobile Number</label>

            <input
              type="text"
              name="mobileNumber"
              value={
                formData.mobileNumber
              }
              onChange={handleChange}
            />
          </div>

          <div className="edit-group">
            <label>Role</label>

            <input
              type="text"
              value={formData.role}
              disabled
            />
          </div>

          <div className="edit-group">
            <label>Status</label>

            <select
              name="active"
              value={
                formData.active
                  ? "true"
                  : "false"
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  active:
                    e.target.value ===
                    "true"
                })
              }
            >
              <option value="true">
                Active
              </option>

              <option value="false">
                Inactive
              </option>
            </select>
          </div>

          <div className="edit-group">
            <label>Created At</label>

            <input
              type="text"
              value={
                formData.createdAt
              }
              disabled
            />
          </div>

          <button
            type="submit"
            className="save-profile-btn"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
}
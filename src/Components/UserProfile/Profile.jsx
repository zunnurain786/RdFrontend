import React from "react";
import "./Profile.css";
import { CgProfile } from "react-icons/cg";

export default function Profile({
  onClose,
  onEdit
}) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="profile-overlay">

      <div className="profile-modal">

        <button
          className="profile-close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="profile-header">

          <div className="profile-avatar-wrapper">
            <CgProfile className="profile-avatar" />
          </div>

          <h2>
            {user?.fullName || "User"}
          </h2>

          <span className="profile-role">
            {user?.role}
          </span>

        </div>

        <div className="profile-body">

          <div className="profile-info-card">

            <div className="profile-info-row">
              <span>User ID</span>
              <strong>{user?.userId}</strong>
            </div>

            <div className="profile-info-row">
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>

            <div className="profile-info-row">
              <span>Mobile</span>
              <strong>
                {user?.mobileNumber}
              </strong>
            </div>

            <div className="profile-info-row">
              <span>Status</span>

              <strong
                className={
                  user?.active
                    ? "status-active"
                    : "status-inactive"
                }
              >
                {user?.active
                  ? "Active"
                  : "Inactive"}
              </strong>
            </div>

            <div className="profile-info-row">
              <span>Role</span>
              <strong>{user?.role}</strong>
            </div>

          </div>

        </div>

        <div className="profile-footer">

          <button
            className="profile-btn profile-edit-btn"
            onClick={onEdit}
          >
            Edit Profile
          </button>

        </div>

      </div>

    </div>
  );
}
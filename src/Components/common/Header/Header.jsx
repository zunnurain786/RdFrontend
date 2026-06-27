import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

import { CgProfile } from "react-icons/cg";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt
} from "react-icons/fa";

import Profile from "../../UserProfile/Profile";
import ProfileEdit from "../../UserProfile/ProfileEdit";

export default function Header() {

  const navigate = useNavigate();

  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("user") || "null"
    );
  } catch (error) {
    console.error(
      "Invalid user data in localStorage",
      error
    );
    user = null;
  }

  const [isOpen, setIsOpen] = useState(false);

  const [isProfileOpen, setIsProfileOpen] =
    useState(false);

  const [isEditProfileOpen,
    setIsEditProfileOpen] =
    useState(false);

  let components = [];

  if (!user) {

    components = [
      "Login",
      "SignUp"
    ];

  } else if (user?.role === "CUSTOMER") {

    components = [
      "Dashboard",
      "My RD Accounts",
      "Installments"
    ];

  } else if (user?.role === "AGENT") {

    components = [
      "Dashboard",
      "My Customers",
      "Collections",
      "Schemes"
    ];

  } else if (user?.role === "ADMIN") {

    components = [
      "Dashboard",
      "Users",
      "Agents",
      "Schemes"
    ];
  }

  const routes = {
    Dashboard: "/",
    "My RD Accounts": "/my-rd-accounts",
    Installments: "/installments",
    "My Customers": "/my-customers",
    Collections: "/collections",
    Users: "/users",
    Agents: "/all-agents",
    Schemes: "/schemes",
    Login: "/login",
    SignUp: "/signup"
  };

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login", {
      replace: true
    });
  };

  const handleEditProfile = () => {

    setIsProfileOpen(false);

    setTimeout(() => {
      setIsEditProfileOpen(true);
    }, 150);
  };

  return (
    <>
      <header className="rd-header">

        <div className="rd-header-left">

          {user && (
            <div
              className="rd-profile"
              onClick={() =>
                setIsProfileOpen(true)
              }
            >
              <CgProfile className="rd-profile-icon" />
            </div>
          )}

          <h2 className="rd-logo">
            Recurring Deposit System
          </h2>

        </div>

        <nav
          className={`rd-nav ${
            isOpen ? "active" : ""
          }`}
        >
          {components.map((item, index) => (

            <Link
              key={index}
              to={routes[item]}
              className="rd-nav-link"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {item}
            </Link>

          ))}

          {user && (
            <button
              className="rd-mobile-logout-btn"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}

        </nav>

        <div className="rd-header-right">

          {user && (
            <span className="rd-user-name">
              {user?.fullName || "User"}
            </span>
          )}

          {user && (
            <button
              className="rd-logout-btn"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          )}

          <button
            className="rd-menu-btn"
            onClick={() =>
              setIsOpen(!isOpen)
            }
          >
            {isOpen
              ? <FaTimes />
              : <FaBars />}
          </button>

        </div>

      </header>

      {isProfileOpen && (
        <Profile
          onClose={() =>
            setIsProfileOpen(false)
          }
          onEdit={handleEditProfile}
        />
      )}

      {isEditProfileOpen && (
        <ProfileEdit
          onClose={() =>
            setIsEditProfileOpen(false)
          }
        />
      )}
    </>
  );
}
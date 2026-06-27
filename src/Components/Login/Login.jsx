import React, { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        await login(formData);

        toast.success(
            "Login Successful"
        );

        setTimeout(() => {
            navigate("/");
        }, 1000);

    } catch (error) {

        console.error(error);

        toast.error(
            error.response?.data?.message ||
            "Invalid Email or Password"
        );
    }
};

    return (
        <>
            <div className="login-container">

                <div className="login-card">

                    <div className="login-header">
                        <h2>Recurring Deposit System</h2>
                        <p>Login To Your Account</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Email Address</label>

                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter Email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>

                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="login-btn"
                        >
                            Login
                        </button>

                        <div className="signup-link">
                            Don't have an account?
                            <Link to="/signup">
                                Register
                            </Link>
                        </div>

                    </form>

                </div>

            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
            />
        </>
    );
}
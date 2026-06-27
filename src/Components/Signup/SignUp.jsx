import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { register } from "../../services/authService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: "",
        role: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ""
        });
    };

    const validateForm = () => {

        let newErrors = {};

        if (!user.fullName.trim()) {
            newErrors.fullName =
                "Full Name is required";
        }

        if (!user.email.trim()) {

            newErrors.email =
                "Email is required";

        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                user.email
            )
        ) {

            newErrors.email =
                "Enter valid email";

        }

        if (!user.mobileNumber.trim()) {

            newErrors.mobileNumber =
                "Mobile Number is required";

        } else if (
            !/^[6-9]\d{9}$/.test(
                user.mobileNumber
            )
        ) {

            newErrors.mobileNumber =
                "Enter valid 10 digit mobile number";

        }

        if (!user.password.trim()) {

            newErrors.password =
                "Password is required";

        } else if (
            user.password.length < 8
        ) {

            newErrors.password =
                "Password must contain at least 8 characters";

        }

        if (!user.role) {

            newErrors.role =
                "Please select role";

        }

        setErrors(newErrors);

        return Object.keys(
            newErrors
        ).length === 0;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {

            setLoading(true);

            const data =
                await register(user);

            toast.success(
                `Welcome ${data.fullName}`
            );

            setUser({
                fullName: "",
                email: "",
                mobileNumber: "",
                password: "",
                role: ""
            });

            setTimeout(() => {

                navigate("/login");

            }, 2000);

        } catch (err) {

            console.error(err);

            const message =
                err?.response?.data?.message ||
                err?.response?.data ||
                "Registration Failed";

            if (
                message.includes(
                    "Email already exists"
                )
            ) {

                setErrors({
                    email: message
                });

            } else if (
                message.includes(
                    "Mobile number already exists"
                )
            ) {

                setErrors({
                    mobileNumber: message
                });

            } else if (
                message.includes(
                    "Password"
                )
            ) {

                setErrors({
                    password: message
                });

            } else {

                toast.error(message);
            }

        } finally {

            setLoading(false);
        }
    };

    return (
        <>
            <div className="signup-container">

                <div className="signup-card">

                    <div className="signup-header">

                        <h2>
                            Recurring Deposit System
                        </h2>

                        <p>
                            Create Your Account
                        </p>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={user.fullName}
                                onChange={handleChange}
                                placeholder="Enter Full Name"
                            />

                            {errors.fullName && (
                                <span className="error-text">
                                    {errors.fullName}
                                </span>
                            )}

                        </div>

                        <div className="form-group">

                            <label>
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="Enter Email Address"
                            />

                            {errors.email && (
                                <span className="error-text">
                                    {errors.email}
                                </span>
                            )}

                        </div>

                        <div className="form-group">

                            <label>
                                Mobile Number
                            </label>

                            <input
                                type="text"
                                name="mobileNumber"
                                value={user.mobileNumber}
                                onChange={handleChange}
                                placeholder="Enter Mobile Number"
                            />

                            {errors.mobileNumber && (
                                <span className="error-text">
                                    {errors.mobileNumber}
                                </span>
                            )}

                        </div>

                        <div className="form-group">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                            />

                            {errors.password && (
                                <span className="error-text">
                                    {errors.password}
                                </span>
                            )}

                        </div>

                        <div className="form-group">

                            <label>
                                Select Role
                            </label>

                            <select
                                name="role"
                                value={user.role}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Role
                                </option>

                                <option value="CUSTOMER">
                                    Customer
                                </option>

                                <option value="AGENT">
                                    Agent
                                </option>

                            </select>

                            {errors.role && (
                                <span className="error-text">
                                    {errors.role}
                                </span>
                            )}

                        </div>

                        <button
                            type="submit"
                            className="signup-btn"
                            disabled={loading}
                        >

                            {
                                loading
                                    ? "Registering..."
                                    : "Register"
                            }

                        </button>

                        <div className="signin-link">

                            Already Registered?

                            <Link to="/login">
                                Sign In
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


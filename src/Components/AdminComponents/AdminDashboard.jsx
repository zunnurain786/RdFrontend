import React, { useEffect, useState } from "react";
import { getAdminDashboard } from "../../services/adminService";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";

export default function AdminDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            if (!user?.userId) {

                return;

            }

            const response =
                await getAdminDashboard(
                    user.userId
                );

            setDashboard(response.data);

        } catch (error) {

            console.error(
                "Admin Dashboard Error",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="customer-loader">

                <div className="customer-spinner"></div>

                <h3>
                    Loading Admin Dashboard...
                </h3>

            </div>

        );

    }

    if (!dashboard) {

        return (

            <div className="customer-loader">

                <h3>
                    No Dashboard Data Found
                </h3>

            </div>

        );

    }

    return (

        <div className="admin-dashboard">

            {/* Welcome Section */}

            <div className="admin-welcome">

                <div className="welcome-left">

                    <h2>
                        Welcome Back,
                        {" "}
                        {dashboard.adminName}
                        {" "}
                        👋
                    </h2>

                    <h3>

                        Your Badge Code&nbsp;

                        <strong>
                            {dashboard.adminCode}
                        </strong>

                    </h3>

                    <p>
                        Manage your Recurring Deposit
                        System efficiently.
                    </p>

                </div>

                <div className="welcome-right">

                    <span className="admin-badge">
                        Administrator
                    </span>

                </div>

            </div>

            {/* System Overview */}

            <h3 className="section-title">
                System Overview
            </h3>

            <div className="stats-grid">

                <div className="stat-card">

                    <h4>Total Users</h4>

                    <h2>
                        {dashboard.totalUsers}
                    </h2>

                </div>

                <div className="stat-card">

                    <h4>Total Customers</h4>

                    <h2>
                        {dashboard.totalCustomers}
                    </h2>

                </div>

                <div className="stat-card">

                    <h4>Total Agents</h4>

                    <h2>
                        {dashboard.totalAgents}
                    </h2>

                </div>

                <div className="stat-card">

                    <h4>Total Schemes</h4>

                    <h2>
                        {dashboard.totalSchemes}
                    </h2>

                </div>

                <div className="stat-card">

                    <h4>Active RD Accounts</h4>

                    <h2>
                        {dashboard.activeRdAccounts}
                    </h2>

                </div>

                <div className="stat-card">

                    <h4>Closed RD Accounts</h4>

                    <h2>
                        {dashboard.closedRdAccounts}
                    </h2>

                </div>

            </div>

            {/* Financial Overview */}

            <h3 className="section-title">

                Financial Overview

            </h3>

            <div className="stats-grid">

                <div className="stat-card amount-card">

                    <h4>
                        Today's Collection
                    </h4>

                    <h2>

                        ₹
                        {
                            dashboard.todayCollection
                                ?.toLocaleString()
                        }

                    </h2>

                </div>

                <div className="stat-card amount-card">

                    <h4>
                        Monthly Collection
                    </h4>

                    <h2>

                        ₹
                        {
                            dashboard.monthlyCollection
                                ?.toLocaleString()
                        }

                    </h2>

                </div>

                <div className="stat-card profit-card">

                    <h4>
                        Today's Profit
                    </h4>

                    <h2>

                        ₹
                        {
                            dashboard.todayProfit
                                ?.toLocaleString()
                        }

                    </h2>

                </div>

            </div>

            {/* Quick Actions */}

            <h3 className="section-title">

                Quick Actions

            </h3>

            <div className="action-grid">

                <Link to="/create-scheme">

                    <button className="action-btn">

                        Create Scheme

                    </button>

                </Link>

                <Link to="/view-reports">

                    <button className="action-btn">

                        View Reports

                    </button>

                </Link>

                <Link to="/transactions">

                    <button className="action-btn">

                        Transactions

                    </button>

                </Link>

            </div>

            {/* Upcoming Features */}

            <h3 className="section-title">

                Upcoming Features

            </h3>

            <div className="future-section">

                <div className="future-card">

                    Agent Performance Tracking

                </div>

                <div className="future-card">

                    Maturity Customer Alerts

                </div>

                <div className="future-card">

                    Pending Collection Reports

                </div>

                <div className="future-card">

                    Monthly Profit Analytics

                </div>

            </div>

        </div>

    );

}
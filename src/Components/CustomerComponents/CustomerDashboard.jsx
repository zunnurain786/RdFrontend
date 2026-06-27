import React, { useEffect, useState } from "react";
import "./CustomerDashboard.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getRdAccountsByCustomerId } from "../../services/rdAccountService";
import Schemes from "../common/Schemes";

export default function CustomerDashboard() {

    const [myRdAccounts, setMyRdAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    useEffect(() => {
        loadMyAccounts();
    }, []);

    const loadMyAccounts = async () => {

        try {

            if (!user?.userId) {

                toast.error("User not found");
                return;
            }

            const response =
                await getRdAccountsByCustomerId(
                    user.userId
                );

            setMyRdAccounts(response.data || []);

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to load RD Accounts"
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="dashboard-loader">

                <div className="dashboard-spinner"></div>

                <h3>Loading Dashboard...</h3>

            </div>

        );

    }

    const activeAccounts =
        myRdAccounts.filter(
            account => account.status === "ACTIVE"
        ).length;

    const closedAccounts =
        myRdAccounts.filter(
            account => account.status === "CLOSED"
        ).length;

    const totalMonthlyDeposit =
        myRdAccounts.reduce(
            (total, account) =>
                total +
                (account.monthlyDepositAmount || 0),
            0
        );

    const totalMaturityAmount =
        myRdAccounts.reduce(
            (total, account) =>
                total +
                (account.maturityAmount || 0),
            0
        );

    const latestAccount =
        myRdAccounts.length > 0
            ? myRdAccounts[
                myRdAccounts.length - 1
            ]
            : null;

    return (

        <>

            <div className="customer-dashboard-home">

                <div className="customer-dashboard-top-section">

                    <div className="customer-dashboard-stat-card">

                        <h2>
                            Hi, {user?.fullName} 👋
                        </h2>

                        <p>
                            Welcome to Recurring Deposit System
                        </p>

                    </div>

                    <div className="customer-dashboard-stat-card">

                        <h4>Joined</h4>

                        <p>
                            {
                                user?.createdAt
                                    ? new Date(
                                        user.createdAt
                                    ).toLocaleDateString()
                                    : "N/A"
                            }
                        </p>

                    </div>

                    <div className="customer-dashboard-stat-card">

                        <h4>Total RD Accounts</h4>

                        <p>{myRdAccounts.length}</p>

                    </div>

                    <div className="customer-dashboard-stat-card">

                        <h4>Active RD</h4>

                        <p>{activeAccounts}</p>

                    </div>

                    <div className="customer-dashboard-stat-card">

                        <h4>Closed RD</h4>

                        <p>{closedAccounts}</p>

                    </div>

                    <div className="customer-dashboard-stat-card">

                        <h4>Total Monthly Deposit</h4>

                        <p>
                            ₹
                            {totalMonthlyDeposit.toLocaleString()}
                        </p>

                    </div>

                    <div className="customer-dashboard-stat-card">

                        <h4>Total Maturity Amount</h4>

                        <p>
                            ₹
                            {totalMaturityAmount.toLocaleString()}
                        </p>

                    </div>

                    <div className="customer-dashboard-stat-card">

                        <h4>Latest Account</h4>

                        <p>
                            {
                                latestAccount?.accountNumber || "N/A"
                            }
                        </p>

                    </div>

                </div>

                <Schemes />

            </div>

            <ToastContainer />

        </>

    );

}
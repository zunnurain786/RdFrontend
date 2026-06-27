import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getAgentDashboard }
from "../../services/agentService";

import "./AgentDashboard.css";

export default function AgentDashboard() {

    const [dashboard, setDashboard] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    useEffect(() => {

        if (user?.userId) {
            loadDashboard();
        }

    }, []);

    const loadDashboard = async () => {

        try {

            const response =
                await getAgentDashboard(
                    user.userId
                );

            setDashboard(response.data);

            if (!response.data) {
                toast.info(
                    "No Dashboard Data Found"
                );
            }

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable To Load Dashboard"
            );

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return (
            <div className="dashboard-loading">
                Loading Dashboard...
            </div>
        );
    }

    return (

        <div className="agent-dashboard-container">

            <div className="dashboard-header">

                <h2>
                    Agent Dashboard
                </h2>

            </div>

            {/* ================= AGENT INFO ================= */}

            <div className="table-wrapper">

                <h3>
                    Agent Information
                </h3>

                <table className="dashboard-table">

                    <thead>

                        <tr>
                            <th>Agent Name</th>
                            <th>Agent Code</th>
                            <th>Branch</th>
                            <th>Joining Date</th>
                            <th>Status</th>
                            <th>Commission %</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>
                                {dashboard?.agentName}
                            </td>

                            <td>
                                {dashboard?.agentCode}
                            </td>

                            <td>
                                {dashboard?.branchName}
                            </td>

                            <td>
                                {dashboard?.joiningDate}
                            </td>

                            <td>

                                <span
                                    className={
                                        dashboard?.active
                                            ? "status-active"
                                            : "status-inactive"
                                    }
                                >
                                    {
                                        dashboard?.active
                                            ? "Active"
                                            : "Inactive"
                                    }
                                </span>

                            </td>

                            <td>
                                {
                                    dashboard?.commissionPercentage
                                } %
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

            {/* ================= COLLECTION SUMMARY ================= */}

            <div className="table-wrapper">

                <h3>
                    Collection Summary
                </h3>

                <table className="dashboard-table">

                    <thead>

                        <tr>
                            <th>Today's Collection</th>
                            <th>Pending Collection</th>
                            <th>Paid Today</th>
                            <th>Remaining Today</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>
                                ₹
                                {
                                    dashboard?.todayCollection || 0
                                }
                            </td>

                            <td>
                                ₹
                                {
                                    dashboard?.pendingCollection || 0
                                }
                            </td>

                            <td>
                                {
                                    dashboard?.paidCustomersToday || 0
                                }
                            </td>

                            <td>
                                {
                                    dashboard?.remainingCustomersToday || 0
                                }
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

            {/* ================= RD ACCOUNT SUMMARY ================= */}

            <div className="table-wrapper">

                <h3>
                    RD Account Summary
                </h3>

                <table className="dashboard-table">

                    <thead>

                        <tr>
                            <th>Total Customers</th>
                            <th>Active RD</th>
                            <th>Closed RD</th>
                            <th>Total Schemes</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>
                                {
                                    dashboard?.totalCustomers || 0
                                }
                            </td>

                            <td>
                                {
                                    dashboard?.activeRdAccounts || 0
                                }
                            </td>

                            <td>
                                {
                                    dashboard?.closedRdAccounts || 0
                                }
                            </td>

                            <td>
                                {
                                    dashboard?.totalSchemes || 0
                                }
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

            {/* ================= EARNINGS ================= */}

            <div className="table-wrapper">

                <h3>
                    Earnings Summary
                </h3>

                <table className="dashboard-table">

                    <thead>

                        <tr>
                            <th>Today's Profit</th>
                            <th>Monthly Profit</th>
                            <th>Total Profit</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>
                                ₹
                                {
                                    dashboard?.todayProfit || 0
                                }
                            </td>

                            <td>
                                ₹
                                {
                                    dashboard?.monthlyProfit || 0
                                }
                            </td>

                            <td>
                                ₹
                                {
                                    dashboard?.totalProfit || 0
                                }
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

            {/* ================= MATURITY CUSTOMERS ================= */}

            <div className="table-wrapper">

                <h3>
                    Upcoming Maturity Customers
                </h3>

                <table className="dashboard-table">

                    <thead>

                        <tr>
                            <th>Customer Name</th>
                            <th>Account Number</th>
                            <th>Mobile Number</th>
                            <th>Maturity Date</th>
                            <th>Maturity Amount</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            dashboard?.maturityCustomers &&
                            dashboard.maturityCustomers.length > 0 ?

                                dashboard.maturityCustomers.map(
                                    (customer) => (

                                        <tr
                                            key={
                                                customer.customerId
                                            }
                                        >

                                            <td>
                                                {
                                                    customer.customerName
                                                }
                                            </td>

                                            <td>
                                                {
                                                    customer.accountNumber
                                                }
                                            </td>

                                            <td>
                                                {
                                                    customer.mobileNumber
                                                }
                                            </td>

                                            <td>
                                                {
                                                    customer.maturityDate
                                                }
                                            </td>

                                            <td>
                                                ₹
                                                {
                                                    customer.maturityAmount
                                                }
                                            </td>

                                        </tr>
                                    )
                                )

                                :

                                <tr>

                                    <td colSpan="5">
                                        No Upcoming Maturity Customers
                                    </td>

                                </tr>
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
}
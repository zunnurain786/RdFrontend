import React, { useEffect, useState } from "react";
import "./Collections.css";
import { getAgentDashboardByUserId } from "../../services/agentService";
import { toast } from "react-toastify";

export default function Collections() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [dashboard, setDashboard] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const loadData = async () => {

            try {

                const response =
                    await getAgentDashboardByUserId(
                        user.userId
                    );

                setDashboard(response.data);

            } catch (error) {

                console.error(error);

                toast.error(
                    "Unable to load collection data"
                );

            } finally {
                setLoading(false);
            }
        };

        loadData();

    }, [user.userId]);

    if (loading) {
        return (
            <div className="collections-loading">
                Loading Collections...
            </div>
        );
    }

    return (
        <div className="collections-container">

            <div className="collections-header">
                <h2>Collections Dashboard</h2>
                <p>
                    Collection summary and recovery performance
                </p>
            </div>

            <div className="collection-cards">

                <div className="collection-card">
                    <h4>Total Customers</h4>
                    <h2>
                        {dashboard?.totalCustomers || 0}
                    </h2>
                </div>

                <div className="collection-card">
                    <h4>Today's Collection</h4>
                    <h2>
                        ₹ {dashboard?.todayCollection || 0}
                    </h2>
                </div>

                <div className="collection-card">
                    <h4>Today's Profit</h4>
                    <h2>
                        ₹ {dashboard?.todayProfit || 0}
                    </h2>
                </div>

                <div className="collection-card">
                    <h4>Pending Collection</h4>
                    <h2>
                        ₹ {dashboard?.pendingCollection || 0}
                    </h2>
                </div>

                <div className="collection-card">
                    <h4>Paid Customers Today</h4>
                    <h2>
                        {dashboard?.paidCustomersToday || 0}
                    </h2>
                </div>

                <div className="collection-card">
                    <h4>Remaining Customers</h4>
                    <h2>
                        {dashboard?.remainingCustomersToday || 0}
                    </h2>
                </div>

            </div>

            <div className="collections-table-section">

                <h3>
                    Collection Performance
                </h3>

                <table className="collections-table">

                    <thead>
                        <tr>
                            <th>Agent Name</th>
                            <th>Branch</th>
                            <th>Total Customers</th>
                            <th>Today's Collection</th>
                            <th>Today's Profit</th>
                            <th>Pending Collection</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                {dashboard?.agentName}
                            </td>

                            <td>
                                {dashboard?.branchName}
                            </td>

                            <td>
                                {dashboard?.totalCustomers}
                            </td>

                            <td>
                                ₹ {dashboard?.todayCollection}
                            </td>

                            <td>
                                ₹ {dashboard?.todayProfit}
                            </td>

                            <td>
                                ₹ {dashboard?.pendingCollection}
                            </td>
                        </tr>
                    </tbody>

                </table>

            </div>

        </div>
    );
}
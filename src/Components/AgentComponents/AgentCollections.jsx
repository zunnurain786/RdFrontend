import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAgentDashboard } from "../../services/agentService";
import "./AgentCollections.css";

export default function AgentCollections() {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [collectionData, setCollectionData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCollections();
    }, []);

    const loadCollections = async () => {

        try {

            const response =
                await getAgentDashboard(
                    user.userId
                );

            setCollectionData(response.data);

            if (!response.data) {
                toast.info(
                    "No collection records found"
                );
            }

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable to load collections"
            );
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="agent-collection-container">

            <div className="agent-collection-header">
                <h2>My Collections</h2>
            </div>

            {
                loading ?

                    (
                        <div className="agent-loading">
                            Loading Collections...
                        </div>
                    )

                    :

                    (
                        <div className="agent-table-wrapper">

                            <table className="agent-collection-table">

                                <thead>
                                    <tr>
                                        <th>Agent</th>
                                        <th>Branch</th>
                                        <th>Total Customers</th>
                                        <th>Active RD</th>
                                        <th>Closed RD</th>
                                        <th>Today Collection</th>
                                        <th>Pending Collection</th>
                                        <th>Today Profit</th>
                                        <th>Monthly Profit</th>
                                        <th>Total Profit</th>
                                        <th>Paid Today</th>
                                        <th>Remaining Today</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        !collectionData ?

                                            (
                                                <tr>
                                                    <td colSpan="13">
                                                        No Collection Data Found
                                                    </td>
                                                </tr>
                                            )

                                            :

                                            (
                                                <tr>

                                                    <td>
                                                        {collectionData.agentName}
                                                    </td>

                                                    <td>
                                                        {collectionData.branchName}
                                                    </td>

                                                    <td>
                                                        {collectionData.totalCustomers}
                                                    </td>

                                                    <td>
                                                        {collectionData.activeRdAccounts}
                                                    </td>

                                                    <td>
                                                        {collectionData.closedRdAccounts}
                                                    </td>

                                                    <td>
                                                        ₹ {collectionData.todayCollection}
                                                    </td>

                                                    <td>
                                                        ₹ {collectionData.pendingCollection}
                                                    </td>

                                                    <td>
                                                        ₹ {collectionData.todayProfit}
                                                    </td>

                                                    <td>
                                                        ₹ {collectionData.monthlyProfit}
                                                    </td>

                                                    <td>
                                                        ₹ {collectionData.totalProfit}
                                                    </td>

                                                    <td>
                                                        {collectionData.paidCustomersToday}
                                                    </td>

                                                    <td>
                                                        {collectionData.remainingCustomersToday}
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={
                                                                collectionData.active
                                                                    ? "collection-status-active"
                                                                    : "collection-status-inactive"
                                                            }
                                                        >
                                                            {
                                                                collectionData.active
                                                                    ? "Active"
                                                                    : "Inactive"
                                                            }
                                                        </span>
                                                    </td>

                                                </tr>
                                            )
                                    }

                                </tbody>

                            </table>

                        </div>
                    )
            }

        </div>
    );
}
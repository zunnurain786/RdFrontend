import React, { useEffect, useState } from "react";
import { getAllAgents } from "../../services/agentService";
import "./AllAgents.css";

export default function AllAgents() {

    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAgents();
    }, []);

    const loadAgents = async () => {

        try {

            const response = await getAllAgents();

            setAgents(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="agents-page">

            <div className="agents-container">

                <div className="agents-header">

                    <h2>All Agents</h2>

                    <span>
                        Total Agents :
                        {" "}
                        {agents.length}
                    </span>

                </div>

                <div className="agents-table-wrapper">

                    <table className="agents-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Agent Code</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>City</th>
                                <th>Branch</th>
                                <th>Joining Date</th>
                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="loading"
                                    >
                                        Loading...
                                    </td>

                                </tr>

                            ) : agents.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="9"
                                        className="loading"
                                    >
                                        No Agents Found
                                    </td>

                                </tr>

                            ) : (

                                agents.map(agent => (

                                    <tr
                                        key={agent.agentId}
                                    >

                                        <td>
                                            {agent.agentId}
                                        </td>

                                        <td>
                                            {agent.agentCode}
                                        </td>

                                        <td>
                                            {agent.user?.fullName}
                                        </td>

                                        <td>
                                            {agent.user?.email}
                                        </td>

                                        <td>
                                            {agent.user?.mobileNumber}
                                        </td>

                                        <td>
                                            {agent.city}
                                        </td>

                                        <td>
                                            {agent.branchName}
                                        </td>

                                        <td>
                                            {agent.joiningDate}
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    agent.active
                                                        ? "active"
                                                        : "inactive"
                                                }
                                            >
                                                {
                                                    agent.active
                                                        ? "Active"
                                                        : "Inactive"
                                                }
                                            </span>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}
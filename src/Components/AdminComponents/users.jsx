import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";
import "./Users.css";

export default function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const response = await getAllUsers();

            setUsers(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="users-page">

            <div className="users-header">

                <h2>User Management</h2>

                <div className="users-count-card">

                    <span>Total Users</span>

                    <h1>{users.length}</h1>

                </div>

            </div>

            <div className="users-table-container">

                {loading ? (

                    <div className="loading-text">
                        Loading Users...
                    </div>

                ) : (

                    <table className="users-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Profile Completed</th>
                            </tr>
                        </thead>

                        <tbody>

                            {users.length > 0 ? (

                                users.map((user) => (

                                    <tr key={user.userId}>

                                        <td>{user.userId}</td>

                                        <td>{user.fullName}</td>

                                        <td>{user.email}</td>

                                        <td>{user.mobileNumber}</td>

                                        <td>
                                            <span className={`role-badge ${user.role?.toLowerCase()}`}>
                                                {user.role}
                                            </span>
                                        </td>

                                        <td>
                                            {user.active ? (
                                                <span className="active-badge">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inactive-badge">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>

                                        <td>
                                            {user.profileCompleted ? (
                                                "Yes"
                                            ) : (
                                                "No"
                                            )}
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="7">
                                        No Users Found
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                )}

            </div>

        </div>
    );
}
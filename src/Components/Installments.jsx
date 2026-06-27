import React, { useEffect, useState } from "react";
import "./Installments.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getCustomerInstallments
} from "../services/installmentService";

export default function Installments() {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const [installments, setInstallments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadInstallments();

    }, []);

    const loadInstallments = async () => {

        try {

            const response =
                await getCustomerInstallments(
                    user.userId
                );

            setInstallments(
                response.data || []
            );

            if (
                !response.data ||
                response.data.length === 0
            ) {
                toast.info(
                    "No Installments Found"
                );
            }

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable To Load Installments"
            );

        } finally {

            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="installments-loading">
                Loading...
            </div>
        );
    }

    return (
        <div className="installments-container">

            <ToastContainer />

            <div className="installments-header">

                <h2>
                    My Installments
                </h2>

                <p>
                    View all paid and pending
                    installments
                </p>

            </div>

            <div className="installments-table-wrapper">

                <table className="installments-table">

                    <thead>

                        <tr>
                            <th>RD Account</th>
                            <th>Scheme</th>
                            <th>Monthly Deposit</th>
                            <th>Paid EMI</th>
                            <th>Pending EMI</th>
                            <th>Maturity Amount</th>
                            <th>Start Date</th>
                            <th>Maturity Date</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {installments.length > 0 ? (

                            installments.map(
                                (item) => (

                                    <tr
                                        key={
                                            item.rdAccountId
                                        }
                                    >

                                        <td>
                                            {
                                                item.accountNumber
                                            }
                                        </td>

                                        <td>
                                            {
                                                item.schemeName
                                            }
                                        </td>

                                        <td>
                                            ₹
                                            {
                                                item.monthlyDepositAmount
                                            }
                                        </td>

                                        <td>
                                            <span className="paid-badge">
                                                {
                                                    item.paidInstallments
                                                }
                                            </span>
                                        </td>

                                        <td>
                                            <span className="pending-badge">
                                                {
                                                    item.pendingInstallments
                                                }
                                            </span>
                                        </td>

                                        <td>
                                            ₹
                                            {
                                                item.maturityAmount
                                            }
                                        </td>

                                        <td>
                                            {
                                                item.startDate
                                            }
                                        </td>

                                        <td>
                                            {
                                                item.maturityDate
                                            }
                                        </td>

                                        <td>

                                            {item.pendingInstallments > 0 ? (

                                                <button
                                                    className="pay-btn"
                                                >
                                                    Pay EMI
                                                </button>

                                            ) : (

                                                <span className="completed-text">
                                                    Completed
                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                )
                            )

                        ) : (

                            <tr>

                                <td
                                    colSpan="9"
                                    className="empty-row"
                                >
                                    No Installments Available
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}
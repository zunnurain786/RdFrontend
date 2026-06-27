import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getRdAccountsByCustomerId } from "../../services/rdAccountService";

import "./RdAccounts.css";

export default function RdAccounts() {

    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    useEffect(() => {

        if (user?.userId) {
            loadAccounts();
        }

    }, []);

    const loadAccounts = async () => {

        try {

            const response =
                await getRdAccountsByCustomerId(
                    user.userId
                );

            setAccounts(response.data || []);

            if (
                !response.data ||
                response.data.length === 0
            ) {
                toast.info(
                    "No RD Accounts Found"
                );
            }

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable To Load RD Accounts"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="customer-rd-container">

            <div className="customer-rd-header">

                <h2>
                    My RD Accounts
                </h2>

                <span>
                    Total Accounts :
                    <strong>
                        {" "}
                        {accounts.length}
                    </strong>
                </span>

            </div>

            <div className="customer-rd-table-wrapper">

                <table className="customer-rd-table">

                    <thead>

                        <tr>
                            <th>Account No</th>
                            <th>Scheme</th>
                            <th>Monthly Deposit</th>
                            <th>Start Date</th>
                            <th>Maturity Date</th>
                            <th>Maturity Amount</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>
                                <td colSpan="7">
                                    Loading...
                                </td>
                            </tr>

                        ) : accounts.length === 0 ? (

                            <tr>
                                <td colSpan="7">
                                    No RD Accounts Found
                                </td>
                            </tr>

                        ) : (

                            accounts.map((account) => (

                                <tr
                                    key={
                                        account.rdAccountId
                                    }
                                >

                                    <td>
                                        {
                                            account.accountNumber
                                        }
                                    </td>

                                    <td>
                                        {
                                            account.schemeName
                                        }
                                    </td>

                                    <td>
                                        ₹
                                        {
                                            account.monthlyDepositAmount
                                        }
                                    </td>

                                    <td>
                                        {
                                            account.startDate
                                        }
                                    </td>

                                    <td>
                                        {
                                            account.maturityDate
                                        }
                                    </td>

                                    <td>
                                        ₹
                                        {
                                            account.maturityAmount
                                        }
                                    </td>

                                    <td>

                                        <span
                                            className={`rd-status ${
                                                account.status?.toLowerCase()
                                            }`}
                                        >
                                            {
                                                account.status
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
    );
}
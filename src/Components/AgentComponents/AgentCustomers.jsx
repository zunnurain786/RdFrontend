import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    getAgentAccounts
} from "../../services/rdAccountService";
import "./AgentCustomers.css";

export default function AgentCustomers() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

const fetchData = async () => {
    try {

        const res =
            await getAgentAccounts(
                user.userId
            );

        setAccounts(res.data);
        console.log(res.data);

    } catch (error) {

        console.log(error);

    }
};

    return (
        <div className="rd-container">

            <h2 className="rd-title">
                My Customers RD Accounts
            </h2>

            <div className="table-wrapper">

                <table className="rd-table">

                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>RD Account No</th>
                            <th>Start Date</th>
                            <th>Maturity Date</th>
                            <th>Paid EMIs</th>
                            <th>Pending EMIs</th>
                            <th>EMI Dates</th>
                        </tr>
                    </thead>

                    <tbody>

                        {accounts.length > 0 ? (

                            accounts.map((item, index) => (
                                <tr key={index}>

                                    <td>
                                        {item.customerName }
                                    </td>

                                    <td>
                                        {item.accountNumber}
                                    </td>

                                    <td>
                                        {item.startDate}
                                    </td>

                                    <td>
                                        {item.maturityDate}
                                    </td>

                                    <td>
                                        <span className="paid">
                                            {item.paidEmi}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="pending">
                                            {item.pendingEmi}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="emi-dates">
                                            {item.emiDay} Day of Every Months
                                        </div>
                                    </td>

                                </tr>
                            ))

                        ) : (
                            <tr>
                                <td colSpan="7">
                                    No RD accounts found
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}
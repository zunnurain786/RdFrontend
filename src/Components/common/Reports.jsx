import React, {
    useEffect,
    useState
} from "react";

import "./Reports.css";

export default function Reports() {

    const [report] =
        useState({

            totalCustomers: 0,
            totalAgents: 0,

            activeAccounts: 0,
            closedAccounts: 0,

            todayCollection: 0,
            monthlyCollection: 0,
            yearlyCollection: 0,

            todayProfit: 0,
            totalProfit: 0,

            totalTransactions: 0
        });

    return (

        <div className="reports-page">

            <div className="reports-header">

                <h2>
                    Reports Dashboard
                </h2>

                <p>
                    Banking Analytics &
                    Performance Reports
                </p>

            </div>

            <div className="reports-grid">

                <div className="report-card">

                    <h3>
                        Customers
                    </h3>

                    <h1>
                        {report.totalCustomers}
                    </h1>

                </div>

                <div className="report-card">

                    <h3>
                        Agents
                    </h3>

                    <h1>
                        {report.totalAgents}
                    </h1>

                </div>

                <div className="report-card">

                    <h3>
                        Active Accounts
                    </h3>

                    <h1>
                        {report.activeAccounts}
                    </h1>

                </div>

                <div className="report-card">

                    <h3>
                        Closed Accounts
                    </h3>

                    <h1>
                        {report.closedAccounts}
                    </h1>

                </div>

                <div className="report-card">

                    <h3>
                        Today's Collection
                    </h3>

                    <h1>
                        ₹{report.todayCollection}
                    </h1>

                </div>

                <div className="report-card">

                    <h3>
                        Monthly Collection
                    </h3>

                    <h1>
                        ₹{report.monthlyCollection}
                    </h1>

                </div>

                <div className="report-card">

                    <h3>
                        Yearly Collection
                    </h3>

                    <h1>
                        ₹{report.yearlyCollection}
                    </h1>

                </div>

                <div className="report-card">

                    <h3>
                        Today's Profit
                    </h3>

                    <h1>
                        ₹{report.todayProfit}
                    </h1>

                </div>

                <div className="report-card">

                    <h3>
                        Total Profit
                    </h3>

                    <h1>
                        ₹{report.totalProfit}
                    </h1>

                </div>

                <div className="report-card">

                    <h3>
                        Transactions
                    </h3>

                    <h1>
                        {report.totalTransactions}
                    </h1>

                </div>

            </div>

        </div>
    );
}
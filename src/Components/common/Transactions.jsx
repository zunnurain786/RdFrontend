import React, {
    useEffect,
    useState
} from "react";

import {
    getAllTransactions
} from "../../services/transactionService";

import {
    toast
} from "react-toastify";

import "./Transactions.css";

export default function Transactions() {

    const [transactions,
        setTransactions] = useState([]);

    const [filteredData,
        setFilteredData] = useState([]);

    const [loading,
        setLoading] = useState(true);

    const [search,
        setSearch] = useState("");

    useEffect(() => {
        loadTransactions();
    }, []);

    useEffect(() => {

        const result =
            transactions.filter(
                item =>
                    item.referenceNumber
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        ) ||

                    item.rdAccount
                        ?.accountNumber
                        ?.toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )
            );

        setFilteredData(result);

    }, [search, transactions]);

    const loadTransactions =
        async () => {

            try {

                const response =
                    await getAllTransactions();

                setTransactions(
                    response.data || []
                );

                setFilteredData(
                    response.data || []
                );

            } catch (error) {

                console.error(error);

                toast.error(
                    "Unable To Load Transactions"
                );

            } finally {

                setLoading(false);
            }
        };

    return (

        <div className="transactions-page">

            <div className="transactions-header">

                <h2>
                    Transactions
                </h2>

                <p>
                    View all customer payments
                </p>

            </div>

            <div className="transactions-search">

                <input
                    type="text"
                    placeholder="Search by Reference Number or Account Number"
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

            {loading ? (

                <div className="loading-box">
                    Loading...
                </div>

            ) : (

                <div className="table-wrapper">

                    <table className="transactions-table">

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Account No</th>

                                <th>Amount</th>

                                <th>Type</th>

                                <th>Payment Mode</th>

                                <th>Reference</th>

                                <th>Date</th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredData.length > 0 ? (

                                filteredData.map(
                                    transaction => (

                                        <tr
                                            key={
                                                transaction.transactionId
                                            }
                                        >

                                            <td>
                                                {
                                                    transaction.transactionId
                                                }
                                            </td>

                                            <td>
                                                {
                                                    transaction.rdAccount
                                                        ?.accountNumber
                                                }
                                            </td>

                                            <td>
                                                ₹
                                                {
                                                    transaction.amount
                                                }
                                            </td>

                                            <td>
                                                {
                                                    transaction.transactionType
                                                }
                                            </td>

                                            <td>
                                                {
                                                    transaction.paymentMode
                                                }
                                            </td>

                                            <td>
                                                {
                                                    transaction.referenceNumber
                                                }
                                            </td>

                                            <td>
                                                {
                                                    transaction.transactionDate
                                                        ?.split(
                                                            "T"
                                                        )[0]
                                                }
                                            </td>

                                        </tr>

                                    )
                                )

                            ) : (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="no-data"
                                    >
                                        No Transactions Found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
}
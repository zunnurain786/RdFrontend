import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSchemes, deleteScheme } from "../../services/schemeService";
import { toast } from "react-toastify";

import "./Schemes.css";

export default function Schemes() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSchemes();
    }, []);

    const loadSchemes = async () => {

        try {

            const response =
                await getAllSchemes();

            setSchemes(response.data || []);

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable To Load Schemes"
            );

        } finally {

            setLoading(false);
        }
    };

    const handleOpenAccount = (scheme) => {

        navigate(
            `/open-rd-account/${scheme.schemeId}`
        );
    };

    const handleEditScheme = (schemeId) => {

        navigate(
            `/edit-scheme/${schemeId}`
        );
    };

    const handleDeleteScheme = async (schemeId) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this scheme?"
            );

        if (!confirmDelete) return;

        try {

            await deleteScheme(schemeId);

            toast.success(
                "Scheme Deleted Successfully"
            );

            loadSchemes();

        } catch (error) {

            console.error(error);

            toast.error(
                "Unable To Delete Scheme"
            );
        }
    };

    return (

        <div className="rd-schemes-page">

            <div className="rd-schemes-header">

                <h2>
                    Recurring Deposit Schemes
                </h2>

                <p>
                    Select a scheme and start your savings journey
                </p>

            </div>

            {loading ? (

                <div className="rd-loading">
                    Loading Schemes...
                </div>

            ) : schemes.length === 0 ? (

                <div className="rd-loading">
                    No Schemes Available
                </div>

            ) : (

                <div className="rd-schemes-row">

                    {schemes.map((scheme) => (

                        <div
                            className="rd-scheme-column"
                            key={scheme.schemeId}
                        >

                            <div className="rd-scheme-card">

                                <div className="rd-card-top">

                                    <h3>
                                        {scheme.schemeName}
                                    </h3>

                                </div>

                                <div className="rd-card-body">

                                    <p>
                                        <strong>
                                            Interest :
                                        </strong>{" "}
                                        {scheme.interestRate}%
                                    </p>

                                    <p>
                                        <strong>
                                            Duration :
                                        </strong>{" "}
                                        {scheme.durationMonths}
                                        {" "}Months
                                    </p>

                                    <p>
                                        <strong>
                                            Minimum :
                                        </strong>{" "}
                                        ₹{scheme.minimumAmount}
                                    </p>

                                    <p>
                                        <strong>
                                            Maximum :
                                        </strong>{" "}
                                        ₹{scheme.maximumAmount}
                                    </p>

                                    <p>
                                        <strong>
                                            Status :
                                        </strong>{" "}
                                        {scheme.active
                                            ? "Active"
                                            : "Inactive"}
                                    </p>

                                </div>

                                <div className="rd-card-footer">
                                    {user?.role === "ADMIN" && (
                                        <>
                                        <button
                                                className="rd-edit-btn"
                                                onClick={() =>
                                                    handleEditScheme(
                                                        scheme.schemeId
                                                    )
                                                }
                                            >
                                                Edit Scheme
                                            </button>

                                            <button
                                                className="rd-delete-btn"
                                                onClick={() =>
                                                    handleDeleteScheme(
                                                        scheme.schemeId
                                                    )
                                                }
                                            >
                                                Delete Scheme
                                            </button>

                                        </>
                                    )}

                                    {user?.role === "CUSTOMER" && (
                                        <>
                                            <button
                                            type="button"
                                            className="rd-open-btn"
                                            onClick={() =>
                                                handleOpenAccount(
                                                    scheme
                                                )
                                            }
                                        >
                                            Open RD Account
                                        </button>
                                        </>
                                    )}

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}
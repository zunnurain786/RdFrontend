import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveScheme } from "../../services/schemeService";
import "./CreateScheme.css";

export default function CreateScheme() {

    const navigate = useNavigate();

    const [scheme, setScheme] = useState({
        schemeName: "",
        interestRate: "",
        durationMonths: "",
        minimumAmount: "",
        maximumAmount: "",
        active: true
    });

    const [loading, setLoading] =
        useState(false);

    const handleChange = (e) => {

        const { name, value, type, checked } =
            e.target;

        setScheme({
            ...scheme,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            Number(scheme.minimumAmount) >
            Number(scheme.maximumAmount)
        ) {
            toast.error(
                "Minimum Amount cannot be greater than Maximum Amount"
            );
            return;
        }

        try {

            setLoading(true);

            await saveScheme(scheme);

            toast.success(
                "Scheme Created Successfully"
            );

            navigate("/schemes");

            setScheme({
                schemeName: "",
                interestRate: "",
                durationMonths: "",
                minimumAmount: "",
                maximumAmount: "",
                active: true
            });

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable To Create Scheme"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="create-scheme-page">

            <div className="create-scheme-card">

                <div className="create-scheme-header">

                    <h2>
                        Create New Scheme
                    </h2>

                    <p>
                        Add a new RD Scheme
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="create-scheme-form"
                >

                    <div className="form-group">

                        <label>
                            Scheme Name
                        </label>

                        <input
                            type="text"
                            name="schemeName"
                            value={scheme.schemeName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Interest Rate (%)
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            name="interestRate"
                            value={scheme.interestRate}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Duration (Months)
                        </label>

                        <input
                            type="number"
                            name="durationMonths"
                            value={scheme.durationMonths}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Minimum Amount
                        </label>

                        <input
                            type="number"
                            name="minimumAmount"
                            value={scheme.minimumAmount}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Maximum Amount
                        </label>

                        <input
                            type="number"
                            name="maximumAmount"
                            value={scheme.maximumAmount}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="checkbox-group">

                        <input
                            type="checkbox"
                            name="active"
                            checked={scheme.active}
                            onChange={handleChange}
                        />

                        <label>
                            Active Scheme
                        </label>

                    </div>

                    <button
                        type="submit"
                        className="create-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating..."
                            : "Create Scheme"}

                    </button>

                </form>

            </div>

        </div>
    );
}
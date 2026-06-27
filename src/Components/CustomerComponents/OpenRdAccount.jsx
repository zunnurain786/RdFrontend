import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getSchemeById } from "../../services/schemeService";
import { saveRdAccount } from "../../services/rdAccountService";
import { getCustomerByUserId } from "../../services/customerService";

import "./OpenRdAccount.css";

export default function OpenRdAccount() {


const { schemeId } = useParams();

const navigate = useNavigate();

const [scheme, setScheme] =
    useState(null);

const [customer, setCustomer] =
    useState(null);

const [loading, setLoading] =
    useState(false);

const [errors, setErrors] =
    useState({});

const [rdAccount, setRdAccount] =
    useState({
        monthlyDepositAmount: "",
        startDate: ""
    });

useEffect(() => {

    loadData();

}, []);

const loadData = async () => {

    try {

        const user =
            JSON.parse(
                localStorage.getItem(
                    "user"
                )
            );

        const schemeResponse =
            await getSchemeById(
                schemeId
            );

        const customerResponse =
            await getCustomerByUserId(
                user.userId
            );

        setScheme(
            schemeResponse.data
        );

        setCustomer(
            customerResponse.data
        );

    } catch (error) {

        console.error(error);

        toast.error(
            "Unable to load RD Account data"
        );
    }
};

const handleChange = (e) => {

    setRdAccount({
        ...rdAccount,
        [e.target.name]:
            e.target.value
    });

    setErrors({
        ...errors,
        [e.target.name]: ""
    });
};

const validateForm = () => {

    let newErrors = {};

    const amount =
        Number(
            rdAccount.monthlyDepositAmount
        );

    if (
        !rdAccount.monthlyDepositAmount
    ) {

        newErrors.monthlyDepositAmount =
            "Monthly Deposit Amount is required";
    }

    if (
        !rdAccount.startDate
    ) {

        newErrors.startDate =
            "Start Date is required";
    }

    if (
        scheme &&
        amount <
        Number(
            scheme.minimumAmount
        )
    ) {

        newErrors.monthlyDepositAmount =
            `Minimum Amount ₹${scheme.minimumAmount}`;
    }

    if (
        scheme &&
        amount >
        Number(
            scheme.maximumAmount
        )
    ) {

        newErrors.monthlyDepositAmount =
            `Maximum Amount ₹${scheme.maximumAmount}`;
    }

    setErrors(
        newErrors
    );

    return (
        Object.keys(
            newErrors
        ).length === 0
    );
};

const duration =
    Number(
        scheme?.durationMonths || 0
    );

const monthlyDeposit =
    Number(
        rdAccount.monthlyDepositAmount || 0
    );

const interestRate =
    Number(
        scheme?.interestRate || 0
    );

const totalDeposit =
    monthlyDeposit *
    duration;

const estimatedInterest =
    (
        totalDeposit *
        interestRate *
        duration
    ) /
    (12 * 100);

const maturityAmount =
    totalDeposit +
    estimatedInterest;

const calculateMaturityDate =
    () => {

        if (
            !rdAccount.startDate ||
            !scheme
        ) {
            return "";
        }

        const date =
            new Date(
                rdAccount.startDate
            );

        date.setMonth(
            date.getMonth() +
            duration
        );

        return date
            .toISOString()
            .split("T")[0];
    };

const handleSubmit =
    async (e) => {

        e.preventDefault();

        if (
            !validateForm()
        ) {
            return;
        }

        try {

            setLoading(true);

            const payload = {

                customerId:
                    customer.customerId,

                schemeId:
                    scheme.schemeId,

                monthlyDepositAmount:
                    Number(
                        rdAccount.monthlyDepositAmount
                    ),

                startDate:
                    rdAccount.startDate
            };

            console.log(
                payload
            );

            await saveRdAccount(
                payload
            );

            toast.success(
                "RD Account Opened Successfully"
            );

            setTimeout(
                () => {

                    navigate(
                        "/my-rd-accounts"
                    );

                },
                1500
            );

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to Open RD Account"
            );

        } finally {

            setLoading(false);
        }
    };

if (
    !scheme ||
    !customer
) {

    return (
        <div>
            Loading...
        </div>
    );
}

return (

    <div className="rd-page">

        <div className="rd-container">

            <div className="rd-card">

                <div className="rd-header">

                    <h2>
                        Open RD Account
                    </h2>

                    <p>
                        Create a New Recurring Deposit Account
                    </p>

                </div>

                <div className="scheme-card">

                    <h3>
                        Scheme Information
                    </h3>

                    <div className="scheme-grid">

                        <div>
                            Scheme Name
                            <span>
                                {scheme.schemeName}
                            </span>
                        </div>

                        <div>
                            Duration
                            <span>
                                {scheme.durationMonths} Months
                            </span>
                        </div>

                        <div>
                            Interest Rate
                            <span>
                                {scheme.interestRate}%
                            </span>
                        </div>

                        <div>
                            Minimum Amount
                            <span>
                                ₹{scheme.minimumAmount}
                            </span>
                        </div>

                        <div>
                            Maximum Amount
                            <span>
                                ₹{scheme.maximumAmount}
                            </span>
                        </div>

                    </div>

                </div>

                <form
                    className="rd-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Monthly Deposit Amount
                        </label>

                        <input
                            type="number"
                            name="monthlyDepositAmount"
                            value={
                                rdAccount.monthlyDepositAmount
                            }
                            onChange={
                                handleChange
                            }
                        />

                        {
                            errors.monthlyDepositAmount &&
                            (
                                <span className="error-text">
                                    {
                                        errors.monthlyDepositAmount
                                    }
                                </span>
                            )
                        }

                    </div>

                    <div className="form-group">

                        <label>
                            Start Date
                        </label>

                        <input
                            type="date"
                            name="startDate"
                            value={
                                rdAccount.startDate
                            }
                            onChange={
                                handleChange
                            }
                        />

                        {
                            errors.startDate &&
                            (
                                <span className="error-text">
                                    {
                                        errors.startDate
                                    }
                                </span>
                            )
                        }

                    </div>

                    <div className="preview-card">

                        <h3>
                            RD Summary
                        </h3>

                        <div className="preview-row">
                            <span>Customer</span>
                            <strong>
                                {customer.fullName}
                            </strong>
                        </div>

                        <div className="preview-row">
                            <span>Total Deposit</span>
                            <strong>
                                ₹{totalDeposit.toFixed(2)}
                            </strong>
                        </div>

                        <div className="preview-row">
                            <span>Estimated Interest</span>
                            <strong>
                                ₹{estimatedInterest.toFixed(2)}
                            </strong>
                        </div>

                        <div className="preview-row">
                            <span>Maturity Date</span>
                            <strong>
                                {calculateMaturityDate()}
                            </strong>
                        </div>

                        <div className="preview-row highlight">
                            <span>
                                Estimated Maturity Amount
                            </span>

                            <strong>
                                ₹{maturityAmount.toFixed(2)}
                            </strong>
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Opening Account..."
                                : "Open RD Account"
                        }

                    </button>

                </form>

            </div>

        </div>

    </div>
);


}

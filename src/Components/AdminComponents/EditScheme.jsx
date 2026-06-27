import React, {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getSchemeById,
    updateScheme
} from "../../services/schemeService";

import { toast } from "react-toastify";

import "./EditScheme.css";

export default function EditScheme() {

    const { schemeId } = useParams();

    const navigate = useNavigate();

    const [scheme, setScheme] =
        useState({

            schemeName: "",
            interestRate: "",
            durationMonths: "",
            minimumAmount: "",
            maximumAmount: "",
            active: true
        });

    useEffect(() => {
        loadScheme();
    }, []);

    const loadScheme = async () => {

        try {

            const response =
                await getSchemeById(
                    schemeId
                );

            setScheme(
                response.data
            );

        } catch (error) {

            toast.error(
                "Unable To Load Scheme"
            );
        }
    };

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

        setScheme({
            ...scheme,
            [name]: value
        });
    };

    const handleSubmit =
        async (e) => {

        e.preventDefault();

        try {

            await updateScheme(
                scheme
            );

            toast.success(
                "Scheme Updated Successfully"
            );

            navigate(
                "/schemes"
            );

        } catch (error) {

            toast.error(
                "Unable To Update Scheme"
            );
        }
    };

    return (

        <div className="edit-scheme-page">

            <div className="edit-scheme-card">

                <h2>
                    Edit Scheme
                </h2>

                <form
                    onSubmit={
                        handleSubmit
                    }
                >

                    <input
                        type="text"
                        name="schemeName"
                        value={
                            scheme.schemeName
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Scheme Name"
                    />

                    <input
                        type="number"
                        name="interestRate"
                        value={
                            scheme.interestRate
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Interest Rate"
                    />

                    <input
                        type="number"
                        name="durationMonths"
                        value={
                            scheme.durationMonths
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Duration"
                    />

                    <input
                        type="number"
                        name="minimumAmount"
                        value={
                            scheme.minimumAmount
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Minimum Amount"
                    />

                    <input
                        type="number"
                        name="maximumAmount"
                        value={
                            scheme.maximumAmount
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Maximum Amount"
                    />

                    <button
                        type="submit"
                    >
                        Update Scheme
                    </button>

                </form>

            </div>

        </div>
    );
}
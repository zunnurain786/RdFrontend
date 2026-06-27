import React, { useState } from "react";
import { toast } from "react-toastify";
import { saveAgent } from "../../services/agentService";
import "./AgentProfileForm.css";

export default function AgentProfileForm() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const cityBranches = {
        Mumbai: [
            "Andheri Branch",
            "Bandra Branch",
            "Kurla Branch",
            "Tilak Nagar Branch",
            "Chembur Branch"
        ],
        Pune: [
            "Shivaji Nagar Branch",
            "Hadapsar Branch",
            "Kothrud Branch"
        ],
        Nashik: [
            "CBS Branch",
            "Gangapur Branch"
        ]
    };

    const [formData, setFormData] = useState({
        address: "",
        city: "",
        branchName: "",
        dateOfBirth: "",
        user: {
            userId: user.userId
        }
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        if (name === "city") {
            setFormData(prev => ({
                ...prev,
                city: value,
                branchName: ""
            }));
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const payload = {
                address: formData.address,
                city: formData.city,
                dateOfBirth: formData.dateOfBirth,
                branchName: formData.branchName,
                user: {
                    userId: Number(user.userId)
                }
            };

            console.log(payload);

            await saveAgent(payload);

            const updatedUser = {
                ...user,
                profileCompleted: true
            };

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            toast.success(
                "Agent Profile Completed Successfully"
            );

            setTimeout(() => {
                window.location.reload();
            }, 1500);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable To Save Profile"
            );
        }
    };

    return (

        <div className="agent-form-overlay">

            <div className="agent-form-modal">

                <div className="agent-form-header">

                    <h2>
                        Complete Agent Profile
                    </h2>

                    <p>
                        Fill Your Personal & Branch Details
                    </p>

                </div>

                <form
                    className="agent-form"
                    onSubmit={handleSubmit}
                >

                    <div className="agent-group">
                        <label>Address</label>

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="agent-group">
                        <label>City</label>

                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                Select City
                            </option>

                            <option value="Mumbai">
                                Mumbai
                            </option>

                            <option value="Pune">
                                Pune
                            </option>

                            <option value="Nashik">
                                Nashik
                            </option>

                        </select>
                    </div>

                    <div className="agent-group">

                        <label>
                            Branch Name
                        </label>

                        <select
                            name="branchName"
                            value={formData.branchName}
                            onChange={handleChange}
                            required
                            disabled={!formData.city}
                        >

                            <option value="">
                                Select Branch
                            </option>

                            {(cityBranches[
                                formData.city
                            ] || []).map(branch => (

                                <option
                                    key={branch}
                                    value={branch}
                                >
                                    {branch}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="agent-group">

                        <label>
                            Date Of Birth
                        </label>

                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="agent-save-btn"
                    >
                        Complete Profile
                    </button>

                </form>

            </div>

        </div>

    );
}
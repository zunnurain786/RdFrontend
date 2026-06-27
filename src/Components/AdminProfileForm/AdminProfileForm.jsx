import React, { useState } from "react";
import "./AdminProfileForm.css";
import { toast } from "react-toastify";
import { saveAdmin } from "../../services/adminService";

export default function AdminProfileForm() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const branchesByCity = {
        Mumbai: [
            "Mumbai Central",
            "Andheri",
            "Borivali",
            "Navi Mumbai"
        ],
        Pune: [
            "Shivaji Nagar",
            "Hadapsar",
            "Kothrud"
        ],
        Nagpur: [
            "Sitabuldi",
            "Dharampeth"
        ],
        Nashik: [
            "College Road",
            "CIDCO"
        ]
    };

const [formData, setFormData] = useState({
    branchName: "",
    department: "",
    designation: "",
    address: "",
    city: "",
    dateOfBirth: "",
    joiningDate: "",
    active: true,
    user: {
        userId: user.userId
    }
});

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        if (name === "city") {

            setFormData({
                ...formData,
                city: value,
                branchName: ""
            });

            return;
        }

        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? checked
                    : value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await saveAdmin(formData);

            toast.success(
                "Admin Profile Saved Successfully"
            );

            const user = JSON.parse(
                        localStorage.getItem("user")
                    );

            const updatedUser = {
                ...user,
                profileCompleted : true
            };

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            setTimeout(() => {
                window.location.reload();
            }, 1500);

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Unable To Save Admin Profile"
            );
        }
    };

    return (

        <div className="admin-form-overlay">

            <div className="admin-form-modal">

                <div className="admin-form-header">

                    <h2>
                        Complete Admin Profile
                    </h2>

                    <p>
                        Enter Administrative Details
                    </p>

                </div>

                <form
                    className="admin-form"
                    onSubmit={handleSubmit}
                >

                    <div className="admin-group">

                        <label>
                            City
                        </label>

                        <select
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select City
                            </option>

                            {Object.keys(branchesByCity)
                                .map(city => (
                                    <option
                                        key={city}
                                        value={city}
                                    >
                                        {city}
                                    </option>
                                ))}

                        </select>

                    </div>

                    <div className="admin-group">

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

                            {formData.city &&
                                branchesByCity[
                                    formData.city
                                ].map(branch => (

                                    <option
                                        key={branch}
                                        value={branch}
                                    >
                                        {branch}
                                    </option>

                                ))}

                        </select>

                    </div>
                    <div className="admin-group">

    <label>
        Department
    </label>

    <select
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
    >
        <option value="">
            Select Department
        </option>

        <option value="Administration">
            Administration
        </option>

        <option value="Operations">
            Operations
        </option>

        <option value="Finance">
            Finance
        </option>

        <option value="Customer Service">
            Customer Service
        </option>

        <option value="IT">
            IT
        </option>

        <option value="HR">
            Human Resource
        </option>

    </select>

</div>
                    
                    <div className="admin-group">

    <label>
        Designation
    </label>

    <select
        name="designation"
        value={formData.designation}
        onChange={handleChange}
        required
    >

        <option value="">
            Select Designation
        </option>

        <option value="Branch Manager">
            Branch Manager
        </option>

        <option value="Assistant Manager">
            Assistant Manager
        </option>

        <option value="Senior Officer">
            Senior Officer
        </option>

        <option value="Officer">
            Officer
        </option>

        <option value="Administrator">
            Administrator
        </option>

    </select>

</div>

                    <div className="admin-group">

                        <label>
                            Address
                        </label>

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter Complete Address"
                            required
                        />

                    </div>

                    <div className="admin-group">

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

                    <div className="admin-group">

                        <label>
                            Joining Date
                        </label>

                        <input
                            type="date"
                            name="joiningDate"
                            value={formData.joiningDate}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="admin-checkbox">

                        <input
                            type="checkbox"
                            id="active"
                            name="active"
                            checked={formData.active}
                            onChange={handleChange}
                        />

                        <label htmlFor="active">
                            Active
                        </label>

                    </div>

                    <div className="admin-terms-box">

                        <h4>
                            Terms & Conditions
                        </h4>

                        <p>
                            1. The administrator is responsible for maintaining accurate customer and scheme records.
                        </p>

                        <p>
                            2. Administrative privileges must be used only for official business purposes.
                        </p>

                        <p>
                            3. Any unauthorized modification of customer, account, or scheme information may result in disciplinary action.
                        </p>

                        <p>
                            4. The administrator must ensure data confidentiality and follow all company security policies.
                        </p>

                        <p>
                            5. Login credentials must not be shared with any other person.
                        </p>

                        <p>
                            6. The organization reserves the right to suspend or revoke administrative access at any time.
                        </p>

                    </div>

                    <button
                        type="submit"
                        className="admin-save-btn"
                    >
                        Save Admin Profile
                    </button>

                </form>

            </div>

        </div>

    );
}


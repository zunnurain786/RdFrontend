import React, { useState } from "react";
import "./CustomerProfileForm.css";
import { toast } from "react-toastify";
import { saveCustomer } from "../../../services/customerService";

export default function CustomerProfileForm() {

const user = JSON.parse(
localStorage.getItem("user")
);

const [formData, setFormData] = useState({
address: "",
city: "",
occupation: "",
monthlyIncome: "",
dateOfBirth: "",
active: true,
user: {
userId: user.userId
}
});

const handleChange = (e) => {


setFormData({
  ...formData,
  [e.target.name]: e.target.value
});


};

const handleSubmit = async (e) => {


e.preventDefault();

try {

  console.log(user);
  await saveCustomer(formData);

  const updatedUser = {
    ...user,
    profileCompleted: true
  };

  

  localStorage.setItem(
    "user",
    JSON.stringify(updatedUser)
  );

  toast.success(
    "Profile Completed Successfully"
  );

  setTimeout(() => {
    window.location.reload();
  }, 1500);

} catch (error) {

  console.error(error);

  toast.error(
    "Unable To Save Profile"
  );
}


};

return ( <div className="customer-form-overlay">


  <div className="customer-form-modal">

    <div className="customer-form-header">

      <h2>
        Complete Your Profile
      </h2>

      <p>
        Please fill your details
        before accessing dashboard
      </p>

    </div>

    <form
      className="customer-form"
      onSubmit={handleSubmit}
    >

      <div className="customer-group">

        <label>Address</label>

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

      </div>

      <div className="customer-group">

        <label>City</label>

        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

      </div>

      <div className="customer-group">

        <label>Occupation</label>

        <input
          type="text"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          required
        />

      </div>

      <div className="customer-group">

        <label>Monthly Income</label>

        <input
          type="number"
          name="monthlyIncome"
          value={formData.monthlyIncome}
          onChange={handleChange}
          required
        />

      </div>

      <div className="customer-group">

        <label>Date Of Birth</label>

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
        className="customer-save-btn"
      >
        Save Profile
      </button>

    </form>

  </div>

</div>


);
}

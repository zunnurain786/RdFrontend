import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerRoutes from "./routes/CustomerRoutes";
import AgentRoutes from "./routes/AgentRoutes";
import AdminRoutes from "./routes/AdminRoutes";


import Header from "./Components/common/Header/Header";
import Footer from "./Components/common/Footer/Footer";
import Home from "./pages/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/SignUp";
import ContactUs from "./pages/ContactUs/ContactUs";
import Profile from "./Components/UserProfile/Profile";
import CompanyProfile from "./pages/CompanyProfile/CompanyProfile";



export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />

        {/* Common Routes */}
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/company-profile" element={<CompanyProfile/>} />

        {/* Customer Routes */}
        {CustomerRoutes()}

        {/* Agent Routes */}
        {AgentRoutes()}

        {/* Admin Routes */}
        {AdminRoutes()}

        {/* 404 */}
        <Route
          path="*"
          element={
            <h2
              style={{
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              404 - Page Not Found
            </h2>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}
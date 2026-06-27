import CustomerDashboard from "../Components/CustomerComponents/CustomerDashboard";
import AgentDashboard from "../Components/AgentComponents/AgentDashboard";
import AdminDashboard from "../Components/AdminComponents/AdminDashboard";

import CustomerProfileForm from "../Components/CustomerComponents/CustomerProfileForm/CustomerProfileForm";
import AgentProfileForm from "../Components/AgentProfileForm/AgentProfileForm";
import AdminProfileForm from "../Components/AdminProfileForm/AdminProfileForm";

export default function Home() {

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    if (!user) {
        return <h3>User not found</h3>;
    }

    // Show profile form first
    if (!user.profileCompleted) {

        switch (user.role) {

            case "CUSTOMER":
                return (
                    <CustomerProfileForm user={user} />
                );

            case "AGENT":
                return (
                    <AgentProfileForm user={user} />
                );

            case "ADMIN":
                return (
                    <AdminProfileForm user={user} />
                );

            default:
                return <h3>Invalid Role</h3>;
        }
    }

    // Show dashboard after profile completion
    switch (user.role) {

        case "CUSTOMER":
            return <CustomerDashboard />;

        case "AGENT":
            return <AgentDashboard />;

        case "ADMIN":
            return <AdminDashboard />;

        default:
            return <h3>Invalid Role</h3>;
    }
}
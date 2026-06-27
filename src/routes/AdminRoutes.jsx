import { Route } from "react-router-dom";


import Users from "../Components/AdminComponents/users";
import AllAgents from "../Components/AdminComponents/AllAgents";
import CreateScheme from "../Components/AdminComponents/CreateScheme";
import EditScheme from "../Components/AdminComponents/EditScheme";
import Transactions from "../Components/common/Transactions";
import Reports from "../Components/common/Reports";

const AdminRoutes = () => {
return (
<>
<Route path="/users" element={<Users />} />


  <Route path="/all-agents" element={<AllAgents />} />

  <Route path="/create-scheme" element={<CreateScheme />} />

  <Route
    path="/edit-scheme/:schemeId"
    element={<EditScheme />}
  />

  <Route
    path="/transactions"
    element={<Transactions />}
  />

  <Route
    path="/view-reports"
    element={<Reports />}
  />
</>


);
};

export default AdminRoutes;

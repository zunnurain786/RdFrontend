import { Route } from "react-router-dom";

import AgentCustomers from "../Components/AgentComponents/AgentCustomers";;
import AgentCollections from "../Components/AgentComponents/AgentCollections";

const AgentRoutes = () => {
return (
<>
<Route
path="/my-customers"
element={<AgentCustomers />}
/>

  <Route
    path="/collections"
    element={<AgentCollections />}
  />
</>


);
};

export default AgentRoutes;

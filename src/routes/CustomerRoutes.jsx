import { Route } from "react-router-dom";

import RdAccounts from "../Components/CustomerComponents/RdAccounts";
import Schemes from "../Components/common/Schemes";
import OpenRdAccount from "../Components/CustomerComponents/OpenRdAccount";
import Installments from "../Components/Installments";

const CustomerRoutes = () => {
return (
<>
<Route
path="/schemes"
element={<Schemes />}
/>


  <Route
    path="/my-rd-accounts"
    element={<RdAccounts />}
  />

  <Route
    path="/open-rd-account/:schemeId"
    element={<OpenRdAccount />}
  />

  <Route
    path="/installments"
    element={<Installments />}
  />
</>


);
};

export default CustomerRoutes;

import api from "../api/axiosConfig";

const ADMIN_BASE_URL = "/admins";

/*

* SAVE ADMIN
  */
  export const saveAdmin = (admin) =>
  api.post(`${ADMIN_BASE_URL}/save`, admin);

/*

* GET ADMIN DASHBOARD
  */
  export const getAdminDashboard = (userId) =>
  api.get(`${ADMIN_BASE_URL}/dashboard/${userId}`);

/*

* GET ADMIN BY USER ID
  */
  export const getAdminByUserId = (userId) =>
  api.get(`${ADMIN_BASE_URL}/user/${userId}`);

/*

* UPDATE ADMIN
  */
  export const updateAdmin = (adminId, adminData) =>
  api.put(
  `${ADMIN_BASE_URL}/${adminId}`,
  adminData
  );

/*

* DELETE ADMIN
  */
  export const deleteAdmin = (adminId) =>
  api.delete(
  `${ADMIN_BASE_URL}/${adminId}`
  );

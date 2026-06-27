import api from "../api/axiosConfig";

const USER_BASE_URL =
"/users";

/*

* GET ALL USERS
  */
  export const getAllUsers =
  () =>
  api.get(
  `${USER_BASE_URL}/all`
  );

/*

* GET USER BY ID
  */
  export const getUserById =
  (userId) =>
  api.get(
  `${USER_BASE_URL}/${userId}`
  );

/*

* UPDATE USER
  */
  export const updateUser =
  (
  userId,
  userData
  ) =>
  api.put(
  `${USER_BASE_URL}/${userId}`,
  userData
  );

/*

* DELETE USER
  */
  export const deleteUser =
  (userId) =>
  api.delete(
  `${USER_BASE_URL}/${userId}`
  );

import api from "../api/axiosConfig";

/*

* USER REGISTRATION
  */
  export const register = async (userData) => {
  const response = await api.post(
  "/auth/register",
  userData
  );

  return response.data;
  };

/*

* USER LOGIN
  */
  export const login = async (credentials) => {

  const response = await api.post(
  "/auth/login",
  credentials
  );

  const data = response.data;

  if (data.token) {
  localStorage.setItem(
  "token",
  data.token
  );
  }

  localStorage.setItem(
  "user",
  JSON.stringify({
  userId: data.userId,
  fullName: data.fullName,
  email: data.email,
  mobileNumber: data.mobileNumber,
  role: data.role,
  active: data.active,
  profileCompleted: data.profileCompleted
  })
  );

  return data;
  };

/*

* LOGOUT
  */
  export const logout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/login";
  };

/*

* GET LOGGED IN USER
  */
  export const getLoggedInUser = () => {

  const user =
  localStorage.getItem("user");

  return user
  ? JSON.parse(user)
  : null;
  };

/*

* GET USER ROLE
  */
  export const getUserRole = () => {

  const user =
  getLoggedInUser();

  return user?.role || null;
  };

/*

* CHECK AUTHENTICATION
  */
  export const isAuthenticated = () => {
  return !!localStorage.getItem(
  "token"
  );
  };

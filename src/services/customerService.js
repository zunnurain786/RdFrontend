import api from "../api/axiosConfig";

const CUSTOMER_BASE_URL =
"/customers";

/*

* CREATE CUSTOMER
  */
  export const saveCustomer =
  (customerData) =>
  api.post(
  `${CUSTOMER_BASE_URL}/save`,
  customerData
  );

/*

* GET ALL CUSTOMERS
  */
  export const getAllCustomers =
  () =>
  api.get(
  `${CUSTOMER_BASE_URL}/all`
  );

/*

* GET CUSTOMER BY ID
  */
  export const getCustomerById =
  (customerId) =>
  api.get(
  `${CUSTOMER_BASE_URL}/${customerId}`
  );

/*

* GET CUSTOMER BY USER ID
  */
  export const getCustomerByUserId =
  (userId) =>
  api.get(
  `${CUSTOMER_BASE_URL}/user/${userId}`
  );

/*

* UPDATE CUSTOMER
  */
  export const updateCustomer =
  (
  customerId,
  customerData
  ) =>
  api.put(
  `${CUSTOMER_BASE_URL}/${customerId}`,
  customerData
  );

/*

* DELETE CUSTOMER
  */
  export const deleteCustomer =
  (customerId) =>
  api.delete(
  `${CUSTOMER_BASE_URL}/${customerId}`
  );

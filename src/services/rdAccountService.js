import api from "../api/axiosConfig";

const RD_ACCOUNT_BASE_URL =
"/rdaccounts";

/*

* CREATE RD ACCOUNT
  */
  export const saveRdAccount =
  (rdAccountData) =>
  api.post(
  `${RD_ACCOUNT_BASE_URL}/save`,
  rdAccountData
  );

/*

* GET ALL RD ACCOUNTS
  */
  export const getAllRdAccounts =
  () =>
  api.get(
  `${RD_ACCOUNT_BASE_URL}/all`
  );

/*

* GET RD ACCOUNT BY ID
  */
  export const getRdAccountById =
  (rdAccountId) =>
  api.get(
  `${RD_ACCOUNT_BASE_URL}/${rdAccountId}`
  );

/*

* GET RD ACCOUNTS BY CUSTOMER ID
  */
  export const getRdAccountsByCustomerId =
  (customerId) =>
  api.get(
  `${RD_ACCOUNT_BASE_URL}/customer/${customerId}`
  );

/*

* GET AGENT ACCOUNTS
  */
  export const getAgentAccounts =
  (userId) =>
  api.get(
  `${RD_ACCOUNT_BASE_URL}/agent/${userId}`
  );

/*

* UPDATE RD ACCOUNT
  */
  export const updateRdAccount =
  (
  rdAccountId,
  rdAccountData
  ) =>
  api.put(
  `${RD_ACCOUNT_BASE_URL}/${rdAccountId}`,
  rdAccountData
  );

/*

* DELETE RD ACCOUNT
  */
  export const deleteRdAccount =
  (rdAccountId) =>
  api.delete(
  `${RD_ACCOUNT_BASE_URL}/${rdAccountId}`
  );

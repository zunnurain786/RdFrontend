import api from "../api/axiosConfig";

const TRANSACTION_BASE_URL =
"/transactions";

/*

* CREATE TRANSACTION
  */
  export const saveTransaction =
  (transactionData) =>
  api.post(
  `${TRANSACTION_BASE_URL}/save`,
  transactionData
  );

/*

* GET ALL TRANSACTIONS
  */
  export const getAllTransactions =
  () =>
  api.get(
  `${TRANSACTION_BASE_URL}/all`
  );

/*

* GET TRANSACTION BY ID
  */
  export const getTransactionById =
  (transactionId) =>
  api.get(
  `${TRANSACTION_BASE_URL}/${transactionId}`
  );

/*

* UPDATE TRANSACTION
  */
  export const updateTransaction =
  (
  transactionId,
  transactionData
  ) =>
  api.put(
  `${TRANSACTION_BASE_URL}/${transactionId}`,
  transactionData
  );

/*

* DELETE TRANSACTION
  */
  export const deleteTransaction =
  (transactionId) =>
  api.delete(
  `${TRANSACTION_BASE_URL}/${transactionId}`
  );

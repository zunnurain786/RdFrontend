import api from "../api/axiosConfig";

const INSTALLMENT_BASE_URL =
"/installments";

/*

* SAVE INSTALLMENT
  */
  export const saveInstallment =
  (installmentData) =>
  api.post(
  `${INSTALLMENT_BASE_URL}/save`,
  installmentData
  );

/*

* GET ALL INSTALLMENTS
  */
  export const getAllInstallments =
  () =>
  api.get(
  `${INSTALLMENT_BASE_URL}/all`
  );

/*

* GET INSTALLMENT BY ID
  */
  export const getInstallmentById =
  (installmentId) =>
  api.get(
  `${INSTALLMENT_BASE_URL}/${installmentId}`
  );

/*

* UPDATE INSTALLMENT
  */
  export const updateInstallment =
  (
  installmentId,
  installmentData
  ) =>
  api.put(
  `${INSTALLMENT_BASE_URL}/${installmentId}`,
  installmentData
  );

/*

* GET CUSTOMER INSTALLMENTS
  */
  export const getCustomerInstallments =
  (userId) =>
  api.get(
  `${INSTALLMENT_BASE_URL}/customer/${userId}`
  );

/*

* DELETE INSTALLMENT
  */
  export const deleteInstallment =
  (installmentId) =>
  api.delete(
  `${INSTALLMENT_BASE_URL}/${installmentId}`
  );

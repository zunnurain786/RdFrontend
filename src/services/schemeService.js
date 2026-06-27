import api from "../api/axiosConfig";

const SCHEME_BASE_URL =
"/schemes";

/*

* CREATE SCHEME
  */
  export const saveScheme =
  (schemeData) =>
  api.post(
  `${SCHEME_BASE_URL}/save`,
  schemeData
  );

/*

* GET ALL SCHEMES
  */
  export const getAllSchemes =
  () =>
  api.get(
  `${SCHEME_BASE_URL}/all`
  );

/*

* GET SCHEME BY ID
  */
  export const getSchemeById =
  (schemeId) =>
  api.get(
  `${SCHEME_BASE_URL}/${schemeId}`
  );

/*

* UPDATE SCHEME
  */
  export const updateScheme =
  (
  schemeId,
  schemeData
  ) =>
  api.put(
  `${SCHEME_BASE_URL}/${schemeId}`,
  schemeData
  );

/*

* DELETE SCHEME
  */
  export const deleteScheme =
  (schemeId) =>
  api.delete(
  `${SCHEME_BASE_URL}/${schemeId}`
  );

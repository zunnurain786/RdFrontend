import api from "../api/axiosConfig";

const AGENT_BASE_URL = "/agents";

/*

* GET ALL AGENTS
  */
  export const getAllAgents = () =>
  api.get(`${AGENT_BASE_URL}/all`);

/*

* GET AGENT BY ID
  */
  export const getAgentById = (agentId) =>
  api.get(`${AGENT_BASE_URL}/${agentId}`);

/*

* CREATE AGENT
  */
  export const saveAgent = (agentData) =>
  api.post(
  `${AGENT_BASE_URL}/save`,
  agentData
  );

/*

* GET AGENT DASHBOARD
  */
  export const getAgentDashboard = (userId) =>
  api.get(
  `${AGENT_BASE_URL}/dashboard/user/${userId}`
  );

/*

* UPDATE AGENT
  */
  export const updateAgent = (
  agentId,
  agentData
  ) =>
  api.put(
  `${AGENT_BASE_URL}/${agentId}`,
  agentData
  );

/*

* DELETE AGENT
  */
  export const deleteAgent = (agentId) =>
  api.delete(
  `${AGENT_BASE_URL}/${agentId}`
  );

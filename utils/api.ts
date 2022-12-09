import axios from "axios";

const API_URL = "http://localhost:3000";

export const getFromAddress = async () => {
  const { data } = await axios({
    method: "get",
    url: `${API_URL}/api/fromAddress`,
  });
  return data;
};

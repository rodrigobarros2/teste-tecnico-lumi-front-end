import axios from "axios";

const backendClient = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_API_URL}`,
});

export { backendClient };

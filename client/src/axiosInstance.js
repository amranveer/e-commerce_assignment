import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // change for production
  withCredentials: true,
});

export default instance;

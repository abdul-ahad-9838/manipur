import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

// Add token to headers if it exists
API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (userInfo && userInfo.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
  }
  return config;
});

export default API;

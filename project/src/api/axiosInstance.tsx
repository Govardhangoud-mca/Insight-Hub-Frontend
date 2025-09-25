// src/api/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://insight-hub-server-production.up.railway.app", // Railway backend URL
  withCredentials: true, // ✅ needed for session-based authentication
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

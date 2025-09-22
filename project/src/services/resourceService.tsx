import axios from "axios";

const API_BASE_URL = "http://localhost:8083/resources"; // Update with your backend URL

export const fetchResources = async () => {
  return axios.get(`${API_BASE_URL}`);
};

export const uploadResource = async (formData: FormData) => {
  return axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteResource = async (id: string) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

export const downloadResource = async (id: string) => {
  return axios.get(`${API_BASE_URL}/download/${id}`, {
    responseType: "blob",
  });
};

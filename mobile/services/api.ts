import axios from "axios";
import { API_BASE_URL } from "@/constants/config";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const authApi = {
  login: (payload: { email: string; password: string }) =>
    api.post("/auth/login", payload),
  register: (payload: { fullName: string; email: string; password: string }) =>
    api.post("/auth/register", payload),
  getProfile: (token: string) =>
    api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default api;

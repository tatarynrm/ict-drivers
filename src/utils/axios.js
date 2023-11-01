import axios from "axios";

// export const API_URL = `http://localhost:8801`;
export const API_URL = `https://api2.ict.lviv.ua`;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return api.request(originalRequest);
      } catch (error) {
        console.log("НЕ АВТОРИЗОВАНИЙ КОРИСТУВАЧ");
        window.localStorage.removeItem('token')
      }
    }
    throw error;
  }
);

export default api;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/v1",
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      console.log(`URL when request is sent: ${config.baseURL}${config.url}`);
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setAxiosResponseInterceptor = () => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;

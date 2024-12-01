import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_EXPRESS_BACKEND,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data?.image) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;

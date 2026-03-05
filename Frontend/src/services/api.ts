import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});


// Danh sách các API không cần đính kèm Token (Public APIs)
const publicEndpoints = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password'];

// Attach token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  // Kiểm tra xem URL hiện tại có nằm trong danh sách không cần token không
  const isPublicAPI = publicEndpoints.some(endpoint => config.url?.includes(endpoint));
  if (token && !isPublicAPI) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally - clear stored auth and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

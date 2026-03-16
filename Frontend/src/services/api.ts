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
// ==================== PERMISSIONS APIS ====================

// Get all permissions
export const getAllPermissions = () => {
  return api.get('/admin/roles/permissions');
};

// Get permissions by role ID
export const getPermissionsByRole = (roleId: number) => {
  return api.get(`/admin/roles/${roleId}/permissions`);
};

// Add permission to role
export const addPermissionToRole = (roleId: number, permissionName: string) => {
  return api.post(`/admin/roles/${roleId}/permissions`, null, {
    params: {
      permissionName: permissionName,
    },
  });
};

// Remove permission from role
export const removePermissionFromRole = (roleId: number, permissionName: string) => {
  return api.post(`/admin/roles/${roleId}/permissions/remove`, null, {
    params: {
      permissionName: permissionName,
    },
  });
};

export default api;

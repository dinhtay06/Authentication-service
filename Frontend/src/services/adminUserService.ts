import { User } from 'lucide-react';
import api from './api';

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  phone?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface CreateUserRequest {
 email: string;
 name: string;
 address?: string;
 role?:{
  name: string;
 };
}
export interface UserDetailResponse extends UserResponse {
  address?: string;
  roles: Role[];
  permissions: string[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
}

export interface ResetPasswordResponse {
  id: string;
  email: string;
  tempPassword: string;
  message: string;
}

export interface AssignRoleRequest {
  roleId: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

const adminUserService = {
  // Get all users with pagination
  getAllUsers: async (
    page: number = 0,
    size: number = 10,
    sortBy: string = 'name',
    sortDir: string = 'asc'
  ): Promise<ApiResponse<PaginatedResponse<UserResponse>>> => {
    const response = await api.get('/api/admin/auth-users', {
      params: { page, size, sortBy, sortDir },
    });
    return response.data;
  },

  // Get user detail by ID
  getUserDetail: async (id: string): Promise<ApiResponse<UserDetailResponse>> => {
    const response = await api.get(`/api/admin/auth-users/${id}`);
    return response.data;
  },

  // Reset password for user
  resetPassword: async (id: string): Promise<ApiResponse<ResetPasswordResponse>> => {
    const response = await api.put(`/api/admin/auth-users/${id}/reset-password`);
    return response.data;
  },

  // Activate user account
  activateUser: async (id: string): Promise<ApiResponse<string>> => {
    const response = await api.put(`/api/admin/auth-users/${id}/activate`);
    return response.data;
  },

  // Assign role to user
  assignRole: async (userId: string, roleId: string): Promise<ApiResponse<string>> => {
    const response = await api.put(`/api/admin/auth-users/${userId}/roles`, {
      roleId,
    });
    return response.data;
  },

  //Create user Account by admin
  createUser: async (UserData: CreateUserRequest): Promise<ApiResponse<UserResponse>> => {
    try{
      const response = await api.post('/api/admin/auth-users', UserData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
};

 
export default adminUserService;

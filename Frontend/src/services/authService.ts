import api from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  address: string;
}

export interface AuthUser {
  id: number | string;
  name: string;
  email: string;
  role: string;
}

// API Response wrapper structure
export interface BaseResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

// Login/Register response data
export interface LoginResponseData {
  accessToken: string;
  refreshToken?: string;
  user?: AuthUser;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  user?: AuthUser;
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<BaseResponse<LoginResponseData>>('/auth/login', data);
    console.log('Login response:', response.data);
    
    const { accessToken, refreshToken, user } = response.data.data;
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);
    
    // Save tokens to localStorage
    localStorage.setItem('token', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return {
      accessToken,
      refreshToken,
      user,
    };
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<BaseResponse<LoginResponseData>>('/auth/register', data);
    console.log('Register response:', response.data);
    
    const { accessToken, refreshToken, user } = response.data.data;
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);
    
    // Save tokens to localStorage
    localStorage.setItem('token', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    
    return {
      accessToken,
      refreshToken,
      user,
    };
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  },

  getCurrentUser(): AuthUser | null {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};

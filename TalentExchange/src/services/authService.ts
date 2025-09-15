import { apiService } from './apiService';
import { User, LoginForm, RegisterForm, ApiResponse } from '../types';

interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  async login(credentials: LoginForm): Promise<AuthResponse> {
    const response = await apiService.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Login failed');
    }
    return response.data;
  }

  async register(userData: RegisterForm): Promise<AuthResponse> {
    const response = await apiService.post<ApiResponse<AuthResponse>>('/auth/register', userData);
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Registration failed');
    }
    return response.data;
  }

  async socialLogin(provider: 'google' | 'facebook' | 'apple', token: string): Promise<AuthResponse> {
    const response = await apiService.post<ApiResponse<AuthResponse>>(`/auth/${provider}`, { token });
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Social login failed');
    }
    return response.data;
  }

  async logout(): Promise<void> {
    await apiService.post('/auth/logout');
  }

  async forgotPassword(email: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>('/auth/forgot-password', { email });
    if (!response.success) {
      throw new Error(response.message || 'Failed to send reset email');
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>('/auth/reset-password', {
      token,
      newPassword,
    });
    if (!response.success) {
      throw new Error(response.message || 'Failed to reset password');
    }
  }

  async verifyEmail(token: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>('/auth/verify-email', { token });
    if (!response.success) {
      throw new Error(response.message || 'Email verification failed');
    }
  }

  async verifyPhone(code: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>('/auth/verify-phone', { code });
    if (!response.success) {
      throw new Error(response.message || 'Phone verification failed');
    }
  }

  async sendPhoneVerification(): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>('/auth/send-phone-verification');
    if (!response.success) {
      throw new Error(response.message || 'Failed to send verification code');
    }
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiService.get<ApiResponse<User>>('/auth/me');
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to get current user');
    }
    return response.data;
  }

  async refreshToken(): Promise<string> {
    const response = await apiService.post<ApiResponse<{ token: string }>>('/auth/refresh');
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Failed to refresh token');
    }
    return response.data.token;
  }
}

export const authService = new AuthService();
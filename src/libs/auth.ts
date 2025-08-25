import axios from 'axios';
import apiClient from './api-client';

const TOKEN_KEY = 'jwt_token';

export const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await apiClient.post('/api/auth/login', { email, password });

    if (response.data && response.data.accessToken) {
      localStorage.setItem(TOKEN_KEY, response.data.accessToken);
      return true;
    }
    return false;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error during login API call:', error.response?.data?.message || error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
    return false;
  }
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(TOKEN_KEY);
    // In a real application, you would also validate the token (e.g., check expiry)
    return !!token;
  }
  return false;
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

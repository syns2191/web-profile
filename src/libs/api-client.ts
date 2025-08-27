import axios from 'axios';
import { config } from '@/config/app.config';
import { getToken, logout } from '@/libs/auth';

const apiClient = axios.create({
  baseURL: config.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    "Cache-Control": "no-cache, no-store, must-revalidate",
  },
});

// Request interceptor to add Authorization header
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') { // Check if on client side
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error codes
    if (error.response) {
      switch (error.response.status) {
        case 401: // Unauthorized
          console.error('Unauthorized: Redirecting to login...');
          if (typeof window !== 'undefined') { // Check if on client side
            logout(); // Clear token and redirect
            window.location.href = '/login';
          }
          break;
        case 403: // Forbidden
          console.error('Forbidden: You do not have permission to access this resource.');
          break;
        case 404: // Not Found
          console.error('Not Found: The requested resource was not found.');
          break;
        case 500: // Internal Server Error
          console.error('Server Error: Something went wrong on the server.');
          break;
        default:
          console.error(`API Error: ${error.response.status} - ${error.response.data.message || error.message}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

import axios from 'axios';

// Get API base URL from environment variables or fallback to development
const getApiBaseUrl = () => {
  // In production, use environment variable
  if (import.meta.env.VITE_API_BASE_URL) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    console.log('Using API base URL from environment:', baseUrl);
    // Ensure the base URL ends with /api
    return baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
  }
  
  // In development, use proxy
  if (import.meta.env.DEV) {
    console.log('Using development API proxy: /api');
    return '/api';
  }
  
  // Fallback for production builds - use the backend Railway URL
  if (window.location.hostname.includes('railway.app')) {
    const apiUrl = 'https://backend-ccs-production.up.railway.app/api';
    console.log('Using Railway backend URL:', apiUrl);
    return apiUrl;
  }
  
  // Final fallback for other deployments
  const fallbackUrl = `${window.location.origin}/api`;
  console.log('Using fallback API URL:', fallbackUrl);
  return fallbackUrl;
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;

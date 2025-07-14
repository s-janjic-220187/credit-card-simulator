import axios from 'axios';

// Get API base URL from environment variables or fallback to development
const getApiBaseUrl = () => {
  console.log('🔍 Environment check:');
  console.log('- VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
  console.log('- DEV mode:', import.meta.env.DEV);
  console.log('- PROD mode:', import.meta.env.PROD);
  console.log('- Current hostname:', window.location.hostname);
  console.log('- Current origin:', window.location.origin);
  console.log('- User agent:', navigator.userAgent);
  
  // CRITICAL: Railway production hardcoded fix
  // This ensures the frontend always uses the correct backend URL on Railway
  const hostname = window.location.hostname;
  const isRailwayProduction = hostname.includes('frontend-ccs-production.up.railway.app') || 
                             hostname.includes('railway.app') || 
                             hostname.includes('.up.railway.app');
  
  if (isRailwayProduction) {
    const apiUrl = 'https://backend-ccs-production.up.railway.app/api';
    console.log('🚀 RAILWAY PRODUCTION DETECTED - Using backend URL:', apiUrl);
    return apiUrl;
  }
  
  // In production, use environment variable if available
  if (import.meta.env.VITE_API_BASE_URL && !import.meta.env.DEV) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    console.log('✓ Using API base URL from environment:', baseUrl);
    // Ensure the base URL ends with /api
    return baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
  }
  
  // In development, use proxy
  if (import.meta.env.DEV) {
    console.log('✓ Using development API proxy: /api');
    return '/api';
  }
  
  // Netlify, Vercel or other static hosting detection
  if (hostname.includes('netlify.app') || hostname.includes('vercel.app') || hostname.includes('github.io')) {
    // For static hosting, use the backend Railway URL
    const apiUrl = 'https://backend-ccs-production.up.railway.app/api';
    console.log('✓ Detected static hosting, using Railway backend URL:', apiUrl);
    return apiUrl;
  }
  
  // Final fallback for other deployments
  const fallbackUrl = `${window.location.origin}/api`;
  console.log('⚠️ Using fallback API URL (this may not work):', fallbackUrl);
  return fallbackUrl;
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 15000, // Increased timeout for Railway deployments
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log the final API configuration
console.log('📡 API Client configured with baseURL:', api.defaults.baseURL);

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
    return response;
  },
  (error) => {
    // Enhanced error logging
    if (error.response) {
      console.error(`❌ API Error ${error.response.status}:`, {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
        data: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText
      });
    } else if (error.request) {
      console.error('❌ Network Error:', {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
        message: 'No response received from server'
      });
    } else {
      console.error('❌ Request Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Health check function to verify API connectivity
export const checkApiHealth = async () => {
  try {
    console.log('🔍 Testing API connectivity...');
    // First try /health, then /ping as fallback
    let response;
    try {
      response = await api.get('/health');
    } catch (healthError) {
      console.log('Health endpoint failed, trying ping...');
      response = await api.get('/ping');
    }
    console.log('✅ API Health Check successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ API Health Check failed:', error);
    return { success: false, error };
  }
};

// Test API connection on app startup (only in production)
if (import.meta.env.PROD) {
  setTimeout(() => {
    checkApiHealth();
  }, 1000);
}

export default api;

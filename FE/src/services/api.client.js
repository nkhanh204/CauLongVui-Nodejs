import axios from 'axios';

/**
 * Centralized Axios instance for CauLongVui API.
 * Base URL: http://localhost:5000/api/v1
 */
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

/**
 * Request Interceptor
 * Gắn x-api-public-key mặc định, và x-api-secret-key nếu có cấu hình cho Admin.
 */
apiClient.interceptors.request.use(
  (config) => {
    config.headers['x-api-public-key'] = import.meta.env.VITE_API_PUBLIC_KEY;
    
    // Bypass: Nếu có Secret Key trong env, nhét luôn vào để cho phép test các Admin Endpoints
    const secretKey = import.meta.env.VITE_API_SECRET_KEY;
    if (secretKey) {
      config.headers['x-api-secret-key'] = secretKey;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * - Nếu `success: true` → Trả về response bình thường.
 * - Nếu `success: false` → Ném lỗi với cấu trúc { message, details, code, status }.
 */
apiClient.interceptors.response.use(
  (response) => {
    // Backend luôn trả về { success, message, data }
    if (response.data && response.data.success === false) {
      return Promise.reject({
        message: response.data.message || 'THAO TÁC THẤT BẠI',
        details: response.data.error?.details || [],
        code: response.data.error?.code || 'UNKNOWN',
        status: response.status,
      });
    }
    return response;
  },
  (error) => {
    const customError = {
      message: error.response?.data?.message || 'LỖI KẾT NỐI SERVER',
      details: error.response?.data?.error?.details || [],
      code: error.response?.data?.error?.code || 'NETWORK_ERROR',
      status: error.response?.status || 500,
    };
    return Promise.reject(customError);
  }
);

export default apiClient;

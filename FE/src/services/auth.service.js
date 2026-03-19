import apiClient from './api.client';

/**
 * Đăng nhập bằng số điện thoại và mật khẩu.
 * @param {{ phoneNumber: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: object }>}
 */
export const login = async (credentials) => {
  const { data } = await apiClient.post('/auth/login', credentials);
  return data.data;
};

/**
 * Đăng ký tài khoản mới.
 * @param {{ fullName: string, phoneNumber: string, email?: string, password: string, roleId: string }} userData
 * @returns {Promise<object>} UserDTO
 */
export const register = async (userData) => {
  const { data } = await apiClient.post('/auth/register', userData);
  return data.data;
};

/**
 * Đăng xuất (phía client xóa token).
 * @returns {Promise<void>}
 */
export const logout = async () => {
  await apiClient.post('/auth/logout');
  localStorage.removeItem('token');
};

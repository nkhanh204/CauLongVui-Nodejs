import apiClient from './api.client';

/**
 * Lấy danh sách toàn bộ các Roles (Phân quyền).
 * @returns {Promise<object>} { items, pagination }
 */
export const getRoles = async () => {
  const { data } = await apiClient.get('/roles');
  return data.data;
};

/**
 * Lấy thông tin chi tiết một Role theo ID.
 * @param {string} id - Role ObjectId
 * @returns {Promise<object>} RoleDTO
 */
export const getRoleById = async (id) => {
  const { data } = await apiClient.get(`/roles/${id}`);
  return data.data;
};

/**
 * Tạo mới một Role (mặc định cho Admin).
 * @param {{ roleName: 'Admin' | 'Staff' | 'Customer' }} roleData
 * @returns {Promise<object>} RoleDTO
 */
export const createRole = async (roleData) => {
  const { data } = await apiClient.post('/roles', roleData);
  return data.data;
};

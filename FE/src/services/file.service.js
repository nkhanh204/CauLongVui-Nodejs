import apiClient from './api.client';

/**
 * Upload nhiều ảnh (tối đa 10 file).
 * @param {File[]} files
 * @returns {Promise<string[]>} Danh sách đường dẫn ảnh.
 */
export const uploadImages = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append('images', file));
  const { data } = await apiClient.post('/files/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
};

/**
 * Upload avatar (1 file).
 * @param {File} file
 * @returns {Promise<string>} Đường dẫn avatar.
 */
export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  const { data } = await apiClient.post('/files/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
};

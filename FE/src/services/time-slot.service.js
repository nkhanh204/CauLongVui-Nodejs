import apiClient from './api.client';

/**
 * Lấy danh sách time slot.
 * @returns {Promise<object>}
 */
export const getTimeSlots = async () => {
  const { data } = await apiClient.get('/time-slots');
  return data.data;
};

/**
 * Lấy thông tin time slot chi tiết.
 * @param {string} id
 * @returns {Promise<object>}
 */
export const getTimeSlotById = async (id) => {
  const { data } = await apiClient.get(`/time-slots/${id}`);
  return data.data;
};

/**
 * Tạo time slot mới. endTime - startTime phải là 30 phút.
 * @param {{ startTime: string, endTime: string, price: number, isPeakHour?: boolean }} slotData
 *   startTime, endTime format: HH:mm
 * @returns {Promise<object>}
 */
export const createTimeSlot = async (slotData) => {
  const { data } = await apiClient.post('/time-slots', slotData);
  return data.data;
};

/**
 * Cập nhật time slot.
 * @param {string} id
 * @param {object} slotData
 * @returns {Promise<object>}
 */
export const updateTimeSlot = async (id, slotData) => {
  const { data } = await apiClient.put(`/time-slots/${id}`, slotData);
  return data.data;
};

/**
 * Xóa time slot.
 * @param {string} id
 * @returns {Promise<object>}
 */
export const deleteTimeSlot = async (id) => {
  const { data } = await apiClient.delete(`/time-slots/${id}`);
  return data.data;
};

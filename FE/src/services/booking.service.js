import apiClient from './api.client';

/**
 * Lấy danh sách toàn bộ booking.
 * @returns {Promise<object>} { items, pagination }
 */
export const getBookings = async () => {
  const { data } = await apiClient.get('/bookings');
  return data.data;
};

/**
 * Lấy thông tin chi tiết booking.
 * @param {string} id - Booking ObjectId
 * @returns {Promise<object>} BookingDTO
 */
export const getBookingById = async (id) => {
  const { data } = await apiClient.get(`/bookings/${id}`);
  return data.data;
};

/**
 * Tạo booking mới.
 * @param {{ courtId: string, slotId: string, bookingDate: string, voucherId?: string, userId?: string }} bookingData
 *   bookingDate phải đúng format YYYY-MM-DD
 * @returns {Promise<object>} BookingDTO
 */
export const createBooking = async (bookingData) => {
  const { data } = await apiClient.post('/bookings', bookingData);
  return data.data;
};

/**
 * Cập nhật thông tin booking.
 * @param {string} id
 * @param {object} bookingData - Partial fields
 * @returns {Promise<object>} BookingDTO
 */
export const updateBooking = async (id, bookingData) => {
  const { data } = await apiClient.put(`/bookings/${id}`, bookingData);
  return data.data;
};

/**
 * Cập nhật trạng thái booking.
 * @param {string} id
 * @param {'Pending' | 'Confirmed' | 'Cancelled'} status
 * @returns {Promise<object>} BookingDTO
 */
export const updateBookingStatus = async (id, status) => {
  const { data } = await apiClient.patch(`/bookings/${id}/status`, { status });
  return data.data;
};

/**
 * Xóa booking.
 * @param {string} id
 * @returns {Promise<object>}
 */
export const deleteBooking = async (id) => {
  const { data } = await apiClient.delete(`/bookings/${id}`);
  return data.data;
};

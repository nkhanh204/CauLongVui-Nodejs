import apiClient from './api.client';

/**
 * Lấy danh sách review theo sân.
 * @param {string} courtId
 * @returns {Promise<object>}
 */
export const getReviewsByCourt = async (courtId) => {
  const { data } = await apiClient.get(`/reviews/court/${courtId}`);
  return data.data;
};

/**
 * Tạo review mới.
 * @param {{ courtId: string, bookingId: string, rating: number, comment?: string, userId?: string }} reviewData
 *   rating: 1-5
 * @returns {Promise<object>} ReviewDTO
 */
export const createReview = async (reviewData) => {
  const { data } = await apiClient.post('/reviews', reviewData);
  return data.data;
};

/**
 * Cập nhật review.
 * @param {string} id
 * @param {{ rating?: number, comment?: string }} reviewData
 * @returns {Promise<object>} ReviewDTO
 */
export const updateReview = async (id, reviewData) => {
  const { data } = await apiClient.put(`/reviews/${id}`, reviewData);
  return data.data;
};

/**
 * Xóa review.
 * @param {string} id
 * @returns {Promise<object>}
 */
export const deleteReview = async (id) => {
  const { data } = await apiClient.delete(`/reviews/${id}`);
  return data.data;
};

import apiClient from './api.client';

/**
 * Lấy danh sách thanh toán.
 * @returns {Promise<object>}
 */
export const getPayments = async () => {
  const { data } = await apiClient.get('/payments');
  return data.data;
};

/**
 * Lấy thông tin thanh toán chi tiết.
 * @param {string} id - Payment ObjectId
 * @returns {Promise<object>} PaymentDTO
 */
export const getPaymentById = async (id) => {
  const { data } = await apiClient.get(`/payments/${id}`);
  return data.data;
};

/**
 * Tạo thanh toán mới.
 * @param {{ bookingId: string, userId: string, amount: number, paymentMethod: 'MoMo'|'VNPay'|'Cash', gatewayResponse?: string }} paymentData
 * @returns {Promise<object>} PaymentDTO
 */
export const createPayment = async (paymentData) => {
  const { data } = await apiClient.post('/payments', paymentData);
  return data.data;
};

/**
 * Cập nhật trạng thái thanh toán.
 * @param {string} id
 * @param {'Pending' | 'Success' | 'Failed'} status
 * @returns {Promise<object>} PaymentDTO
 */
export const updatePaymentStatus = async (id, status) => {
  const { data } = await apiClient.patch(`/payments/${id}/status`, { status });
  return data.data;
};

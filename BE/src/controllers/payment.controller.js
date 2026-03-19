const paymentService = require('../services/payment.service');
const { sendResponse } = require('../utils/response');
const { paymentDto } = require('../dtos/payment.dto');

const createPayment = async (req, res) => {
  const userId = req.user.id;
  const payment = await paymentService.create({ ...req.body, userId });
  return sendResponse(res, 201, true, 'Payment record created', paymentDto(payment));
};

const getPayments = async (req, res) => {
  const data = await paymentService.findAll(req.query);
  const items = data.items.map(paymentDto);
  return sendResponse(res, 200, true, 'Get payments success', { ...data, items });
};

const getPaymentById = async (req, res) => {
  const payment = await paymentService.findById(req.params.id);
  return sendResponse(res, 200, true, 'Get payment detail success', paymentDto(payment));
};

const updatePaymentStatus = async (req, res) => {
  const { status } = req.body;
  const payment = await paymentService.updateStatus(req.params.id, status);
  return sendResponse(res, 200, true, 'Update payment status success', paymentDto(payment));
};

module.exports = {
  createPayment,
  getPayments,
  getPaymentById,
  updatePaymentStatus,
};

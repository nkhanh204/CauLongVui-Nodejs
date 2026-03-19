const Payment = require('../models/payment.model');
const bookingService = require('./booking.service');
const userService = require('./user.service');
const { BadRequestError } = require('../exceptions/BadRequestError');

/**
 * Create a new payment record
 * @param {Object} paymentData 
 * @returns {Promise<Object>}
 */
const create = async (paymentData) => {
  // Verify related entities exist
  await bookingService.findById(paymentData.bookingId);
  await userService.findById(paymentData.userId);

  return await Payment.create(paymentData);
};

/**
 * Find all payments
 * @returns {Promise<Object>}
 */
const findAll = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const items = await Payment.find().skip(skip).limit(limit);
  const total = await Payment.countDocuments();
  return { items, pagination: { page, limit, total } };
};

/**
 * Find payment by ID
 * @param {string} id 
 * @returns {Promise<Object>}
 */
const findById = async (id) => {
  const payment = await Payment.findById(id);
  if (!payment) throw new BadRequestError('Payment record not found');
  return payment;
};

/**
 * Update payment status
 * @param {string} id 
 * @param {string} status 
 * @returns {Promise<Object>}
 */
const updateStatus = async (id, status) => {
  const payment = await Payment.findByIdAndUpdate(id, { status }, { new: true });
  if (!payment) throw new BadRequestError('Payment record not found');
  return payment;
};

module.exports = {
  create,
  findAll,
  findById,
  updateStatus,
};

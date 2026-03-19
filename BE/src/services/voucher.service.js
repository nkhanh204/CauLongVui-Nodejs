const Voucher = require('../models/voucher.model');
const { BadRequestError } = require('../exceptions/BadRequestError');

/**
 * Create a new voucher
 * @param {Object} voucherData 
 * @returns {Promise<Object>}
 */
const create = async (voucherData) => {
  const existing = await Voucher.findOne({ voucherCode: voucherData.voucherCode });
  if (existing) throw new BadRequestError('Voucher code already exists');
  return await Voucher.create(voucherData);
};

/**
 * Find all vouchers
 * @returns {Promise<Object>}
 */
const findAll = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const items = await Voucher.find().skip(skip).limit(limit);
  const total = await Voucher.countDocuments();
  return { items, pagination: { page, limit, total } };
};

/**
 * Find voucher by ID
 * @param {string} id 
 * @returns {Promise<Object>}
 */
const findById = async (id) => {
  const voucher = await Voucher.findById(id);
  if (!voucher) throw new BadRequestError('Voucher not found');
  return voucher;
};

/**
 * Update voucher
 * @param {string} id 
 * @param {Object} updateData 
 * @returns {Promise<Object>}
 */
const update = async (id, updateData) => {
  const voucher = await Voucher.findByIdAndUpdate(id, updateData, { new: true });
  if (!voucher) throw new BadRequestError('Voucher not found');
  return voucher;
};

/**
 * Delete voucher
 * @param {string} id 
 * @returns {Promise<void>}
 */
const remove = async (id) => {
  const voucher = await Voucher.findByIdAndDelete(id);
  if (!voucher) throw new BadRequestError('Voucher not found');
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};

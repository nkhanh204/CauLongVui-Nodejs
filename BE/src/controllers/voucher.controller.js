const voucherService = require('../services/voucher.service');
const { sendResponse } = require('../utils/response');
const { voucherDto } = require('../dtos/voucher.dto');

const getVouchers = async (req, res) => {
  const data = await voucherService.findAll(req.query);
  const items = data.items.map(voucherDto);
  return sendResponse(res, 200, true, 'Get vouchers success', { ...data, items });
};

const getVoucherById = async (req, res) => {
  const voucher = await voucherService.findById(req.params.id);
  return sendResponse(res, 200, true, 'Get voucher detail success', voucherDto(voucher));
};

const createVoucher = async (req, res) => {
  const voucher = await voucherService.create(req.body);
  return sendResponse(res, 201, true, 'Create voucher success', voucherDto(voucher));
};

const updateVoucher = async (req, res) => {
  const voucher = await voucherService.update(req.params.id, req.body);
  return sendResponse(res, 200, true, 'Update voucher success', voucherDto(voucher));
};

const deleteVoucher = async (req, res) => {
  await voucherService.remove(req.params.id);
  return sendResponse(res, 200, true, 'Delete voucher success');
};

module.exports = {
  getVouchers,
  getVoucherById,
  createVoucher,
  updateVoucher,
  deleteVoucher,
};

const timeSlotService = require('../services/time-slot.service');
const { sendResponse } = require('../utils/response');

const getTimeSlots = async (req, res) => {
  const data = await timeSlotService.findAll();
  return sendResponse(res, 200, true, 'Get time slots success', data);
};

const getTimeSlotById = async (req, res) => {
  const data = await timeSlotService.findById(req.params.id);
  return sendResponse(res, 200, true, 'Get time slot detail success', data);
};

const createTimeSlot = async (req, res) => {
  const data = await timeSlotService.create(req.body);
  return sendResponse(res, 201, true, 'Create time slot success', data);
};

const updateTimeSlot = async (req, res) => {
  const data = await timeSlotService.update(req.params.id, req.body);
  return sendResponse(res, 200, true, 'Update time slot success', data);
};

const deleteTimeSlot = async (req, res) => {
  await timeSlotService.delete(req.params.id);
  return sendResponse(res, 200, true, 'Delete time slot success');
};

module.exports = {
  getTimeSlots,
  getTimeSlotById,
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
};

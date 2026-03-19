const TimeSlot = require('../models/time-slot.model');
const { NotFoundError } = require('../exceptions/NotFoundError');
const { BadRequestError } = require('../exceptions/BadRequestError');

/**
 * Find all time slots
 * @returns {Promise<Array>}
 */
const findAll = async () => {
  return await TimeSlot.find();
};

/**
 * Find time slot by ID
 * @param {string} id 
 * @returns {Promise<Object>}
 */
const findById = async (id) => {
  const slot = await TimeSlot.findById(id);
  if (!slot) throw new NotFoundError('Time slot not found');
  return slot;
};

/**
 * Create new time slot
 * @param {Object} slotData 
 * @returns {Promise<Object>}
 */
const create = async (slotData) => {
  const { startTime, endTime } = slotData;
  if (endTime <= startTime) {
    throw new BadRequestError('End time must be after start time');
  }
  // TODO: Check for overlapping slots if needed
  return await TimeSlot.create(slotData);
};

/**
 * Update time slot
 * @param {string} id 
 * @param {Object} updateData 
 * @returns {Promise<Object>}
 */
const update = async (id, updateData) => {
  const slot = await TimeSlot.findByIdAndUpdate(id, updateData, { new: true });
  if (!slot) throw new NotFoundError('Time slot not found');
  return slot;
};

/**
 * Delete time slot
 * @param {string} id 
 * @returns {Promise<void>}
 */
const deleteSlot = async (id) => {
  const slot = await TimeSlot.findByIdAndDelete(id);
  if (!slot) throw new NotFoundError('Time slot not found');
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteSlot,
};

const Court = require('../models/court.model');
const Review = require('../models/review.model');
const TimeSlot = require('../models/time-slot.model');
const { NotFoundError } = require('../exceptions/NotFoundError');

/**
 * Find all courts with pagination
 * @param {Object} options - Filtering and pagination options
 * @returns {Promise<Object>}
 */
const findAll = async ({ page = 1, limit = 10, isMaintenance }) => {
  const query = { status: { $ne: 'deleted' } };
  if (isMaintenance !== undefined) query.isMaintenance = isMaintenance;
  
  const skip = (page - 1) * limit;
  const items = await Court.find(query).skip(skip).limit(limit);
  const total = await Court.countDocuments(query);
  
  return { items, pagination: { page, limit, total } };
};

/**
 * Find court by ID
 * @param {string} id 
 * @returns {Promise<Object>}
 */
const findById = async (id) => {
  const court = await Court.findOne({ _id: id, status: { $ne: 'deleted' } });
  if (!court) throw new NotFoundError('Court not found');
  return court;
};

/**
 * Create new court
 * @param {Object} courtData 
 * @returns {Promise<Object>}
 */
const create = async (courtData) => {
  return await Court.create(courtData);
};

/**
 * Update court
 * @param {string} id 
 * @param {Object} updateData 
 * @returns {Promise<Object>}
 */
const update = async (id, updateData) => {
  const court = await Court.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });
  if (!court) throw new NotFoundError('Court not found');
  return court;
};

/**
 * Delete court (Soft delete)
 * @param {string} id 
 * @returns {Promise<void>}
 */
const deleteCourt = async (id) => {
  const court = await Court.findOneAndUpdate(
    { _id: id, status: { $ne: 'deleted' } },
    { status: 'deleted' },
    { returnDocument: 'after' }
  );
  if (!court) throw new NotFoundError('Court not found or already deleted');
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteCourt,
};

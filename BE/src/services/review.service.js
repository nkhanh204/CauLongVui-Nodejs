const Review = require('../models/review.model');
const courtService = require('./court.service');
const bookingService = require('./booking.service');
const userService = require('./user.service');
const { BadRequestError } = require('../exceptions/BadRequestError');

/**
 * Create a new review
 * @param {string} userId - ID of the user creating the review
 * @param {Object} reviewData 
 * @returns {Promise<Object>}
 */
const create = async (userId, reviewData) => {
  // Verify related entities exist
  await userService.findById(userId);
  await courtService.findById(reviewData.courtId);
  await bookingService.findById(reviewData.bookingId);

  return await Review.create({ ...reviewData, userId });
};

/**
 * Find all reviews for a specific court
 * @param {string} courtId 
 * @returns {Promise<Array>}
 */
const findByCourt = async (courtId) => {
  return await Review.find({ courtId }).sort({ createdAt: -1 });
};

/**
 * Delete a review
 * @param {string} id 
 * @returns {Promise<void>}
 */
const remove = async (id) => {
  const review = await Review.findByIdAndDelete(id);
  if (!review) throw new BadRequestError('Review not found');
};

/**
 * Update a review
 * @param {string} id 
 * @param {Object} updateData 
 * @returns {Promise<Object>}
 */
const update = async (id, updateData) => {
  const review = await Review.findByIdAndUpdate(id, updateData, { new: true });
  if (!review) throw new BadRequestError('Review not found');
  return review;
};

module.exports = {
  create,
  findByCourt,
  remove,
  update,
};

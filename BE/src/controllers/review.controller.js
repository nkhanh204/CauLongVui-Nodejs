const reviewService = require('../services/review.service');
const { sendResponse } = require('../utils/response');
const { reviewDto } = require('../dtos/review.dto');

const createReview = async (req, res) => {
  // Lấy userId từ token (req.user) nếu có Auth middleware, 
  // hoặc từ body (req.body.userId) dùng tạm cho test Postman
  const userId = req.user?.id || req.body.userId;
  
  if (!userId) {
    return sendResponse(res, 400, false, 'User ID is required (Please provide in Auth token or body)');
  }

  const review = await reviewService.create(userId, req.body);
  return sendResponse(res, 201, true, 'Review created', reviewDto(review));
};

const getReviewsByCourt = async (req, res) => {
  const reviews = await reviewService.findByCourt(req.params.courtId);
  const data = reviews.map(reviewDto);
  return sendResponse(res, 200, true, 'Get reviews success', data);
};

const deleteReview = async (req, res) => {
  await reviewService.remove(req.params.id);
  return sendResponse(res, 200, true, 'Review deleted');
};

const updateReview = async (req, res) => {
  const review = await reviewService.update(req.params.id, req.body);
  return sendResponse(res, 200, true, 'Review updated', reviewDto(review));
};

module.exports = {
  createReview,
  getReviewsByCourt,
  deleteReview,
  updateReview,
};

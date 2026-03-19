/**
 * Map Review model to DTO
 * @param {Object} review 
 * @returns {Object}
 */
const reviewDto = (review) => {
  if (!review) return null;
  return {
    id: review._id,
    userId: review.userId,
    courtId: review.courtId,
    bookingId: review.bookingId,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,
  };
};

module.exports = {
  reviewDto,
};

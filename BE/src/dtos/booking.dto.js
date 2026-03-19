/**
 * Map Booking model to DTO
 * @param {Object} booking 
 * @returns {Object}
 */
const bookingDto = (booking) => {
  if (!booking) return null;
  return {
    id: booking._id,
    userId: booking.userId,
    courtId: booking.courtId,
    slotId: booking.slotId,
    bookingDate: booking.bookingDate,
    voucherId: booking.voucherId,
    discountAmount: booking.discountAmount,
    totalPrice: booking.totalPrice,
    status: booking.status,
    createdAt: booking.createdAt,
  };
};

module.exports = {
  bookingDto,
};

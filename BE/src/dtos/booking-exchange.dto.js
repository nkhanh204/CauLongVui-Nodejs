/**
 * Map BookingExchange model to DTO
 * @param {Object} exchange
 * @returns {Object}
 */
const bookingExchangeDto = (exchange) => {
  if (!exchange) return null;
  return {
    id: exchange._id,
    bookingId: exchange.bookingId,
    sellerId: exchange.sellerId,
    originalPrice: exchange.originalPrice,
    price: exchange.price,
    status: exchange.status,
    buyerId: exchange.buyerId,
    createdAt: exchange.createdAt,
    updatedAt: exchange.updatedAt,
  };
};

module.exports = {
  bookingExchangeDto,
};

const bookingExchangeService = require('../services/booking-exchange.service');
const { sendResponse } = require('../utils/response');
const { bookingExchangeDto } = require('../dtos/booking-exchange.dto');

/**
 * Get all booking exchanges
 */
const getBookingExchanges = async (req, res) => {
  const data = await bookingExchangeService.findAll(req.query);
  const items = data.items.map(bookingExchangeDto);
  return sendResponse(res, 200, true, 'Get booking exchanges success', { ...data, items });
};

/**
 * Get booking exchange by ID
 */
const getBookingExchangeById = async (req, res) => {
  const exchange = await bookingExchangeService.findById(req.params.id);
  return sendResponse(res, 200, true, 'Get booking exchange detail success', bookingExchangeDto(exchange));
};

/**
 * Create a new booking exchange listing
 */
const createBookingExchange = async (req, res) => {
  const sellerId = req.user.id;
  const { bookingId } = req.body;
  const exchange = await bookingExchangeService.create(sellerId, bookingId);
  return sendResponse(res, 201, true, 'Booking exchange listed successfully', bookingExchangeDto(exchange));
};

/**
 * Take over a booking exchange (buy)
 */
const takeBookingExchange = async (req, res) => {
  const buyerId = req.user.id;
  const exchange = await bookingExchangeService.take(req.params.id, buyerId);
  return sendResponse(res, 200, true, 'Booking exchange completed successfully', bookingExchangeDto(exchange));
};

/**
 * Cancel a booking exchange listing
 */
const cancelBookingExchange = async (req, res) => {
  const sellerId = req.user.id;
  const exchange = await bookingExchangeService.cancel(req.params.id, sellerId);
  return sendResponse(res, 200, true, 'Booking exchange cancelled successfully', bookingExchangeDto(exchange));
};

module.exports = {
  getBookingExchanges,
  getBookingExchangeById,
  createBookingExchange,
  takeBookingExchange,
  cancelBookingExchange,
};

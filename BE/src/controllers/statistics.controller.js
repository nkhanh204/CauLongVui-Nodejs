const statisticsService = require('../services/statistics.service');
const { sendResponse } = require('../utils/response');

/**
 * Get revenue by month
 */
const getRevenueByMonth = async (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  const data = await statisticsService.getRevenueByMonth(year);
  return sendResponse(res, 200, true, 'Get revenue by month success', data);
};

/**
 * Get top booked courts
 */
const getTopCourts = async (req, res) => {
  const limit = req.query.limit || 5;
  const data = await statisticsService.getTopCourts(limit);
  return sendResponse(res, 200, true, 'Get top courts success', data);
};

/**
 * Get system overview
 */
const getOverview = async (req, res) => {
  const data = await statisticsService.getOverview();
  return sendResponse(res, 200, true, 'Get overview success', data);
};

/**
 * Get revenue by payment method
 */
const getRevenueByPaymentMethod = async (req, res) => {
  const data = await statisticsService.getRevenueByPaymentMethod();
  return sendResponse(res, 200, true, 'Get revenue by payment method success', data);
};

/**
 * Get booking status distribution
 */
const getBookingStatusDistribution = async (req, res) => {
  const data = await statisticsService.getBookingStatusDistribution();
  return sendResponse(res, 200, true, 'Get booking status distribution success', data);
};

module.exports = {
  getRevenueByMonth,
  getTopCourts,
  getOverview,
  getRevenueByPaymentMethod,
  getBookingStatusDistribution,
};

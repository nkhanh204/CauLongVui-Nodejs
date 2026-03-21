const Booking = require('../models/booking.model');
const Payment = require('../models/payment.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');

/**
 * Get revenue grouped by month for a given year
 * @param {number} year - Year to filter (e.g. 2026)
 * @returns {Promise<Array>} - Array of { month, totalRevenue, totalOrders }
 */
const getRevenueByMonth = async (year) => {
  const startDate = new Date(`${year}-01-01`);
  const endDate = new Date(`${Number(year) + 1}-01-01`);

  return await Payment.aggregate([
    {
      $match: {
        status: 'Success',
        createdAt: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        totalRevenue: { $sum: '$amount' },
        totalOrders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 0,
        month: '$_id',
        totalRevenue: 1,
        totalOrders: 1,
      },
    },
  ]);
};

/**
 * Get top booked courts
 * @param {number} [limit=5] - Number of top courts
 * @returns {Promise<Array>} - Array of { courtId, courtName, totalBookings }
 */
const getTopCourts = async (limit = 5) => {
  return await Booking.aggregate([
    { $match: { status: 'Confirmed' } },
    {
      $group: {
        _id: '$courtId',
        totalBookings: { $sum: 1 },
      },
    },
    { $sort: { totalBookings: -1 } },
    { $limit: Number(limit) },
    {
      $lookup: {
        from: 'courts',
        localField: '_id',
        foreignField: '_id',
        as: 'court',
      },
    },
    { $unwind: '$court' },
    {
      $project: {
        _id: 0,
        courtId: '$_id',
        courtName: '$court.courtName',
        totalBookings: 1,
      },
    },
  ]);
};

/**
 * Get system overview counters
 * @returns {Promise<Object>} - { totalUsers, totalBookings, totalRevenue, todayBookings }
 */
const getOverview = async () => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [totalUsers, totalBookings, revenueResult, todayBookings] = await Promise.all([
    User.countDocuments({ status: { $ne: 'deleted' } }),
    Booking.countDocuments({ status: { $ne: 'Cancelled' } }),
    Payment.aggregate([
      { $match: { status: 'Success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]),
    Booking.countDocuments({
      createdAt: { $gte: todayStart },
      status: { $ne: 'Cancelled' },
    }),
  ]);

  return {
    totalUsers,
    totalBookings,
    totalRevenue: revenueResult[0]?.total || 0,
    todayBookings,
  };
};

/**
 * Get revenue grouped by payment method
 * @returns {Promise<Array>} - Array of { paymentMethod, totalRevenue, totalOrders }
 */
const getRevenueByPaymentMethod = async () => {
  return await Payment.aggregate([
    { $match: { status: 'Success' } },
    {
      $group: {
        _id: '$paymentMethod',
        totalRevenue: { $sum: '$amount' },
        totalOrders: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        paymentMethod: '$_id',
        totalRevenue: 1,
        totalOrders: 1,
      },
    },
    { $sort: { totalRevenue: -1 } },
  ]);
};

/**
 * Get booking status distribution
 * @returns {Promise<Array>} - Array of { status, count }
 */
const getBookingStatusDistribution = async () => {
  return await Booking.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: '$_id',
        count: 1,
      },
    },
    { $sort: { count: -1 } },
  ]);
};

module.exports = {
  getRevenueByMonth,
  getTopCourts,
  getOverview,
  getRevenueByPaymentMethod,
  getBookingStatusDistribution,
};

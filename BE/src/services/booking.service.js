const Booking = require('../models/booking.model');
const socketService = require('./socket.service');
const timeSlotService = require('./time-slot.service');
const voucherService = require('./voucher.service');
const courtService = require('./court.service');
const userService = require('./user.service');
const { BadRequestError } = require('../exceptions/BadRequestError');

/**
 * Create a new booking
 * @param {Object} bookingData 
 * @returns {Promise<Object>}
 */
const create = async (bookingData) => {
  // Verify related entities exist (Foreign Key checks)
  await courtService.findById(bookingData.courtId);
  await userService.findById(bookingData.userId);

  // Realtime Double-Booking Check
  const inputDate = new Date(bookingData.bookingDate);
  const startOfDay = new Date(Date.UTC(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), inputDate.getUTCDate(), 0, 0, 0, 0));
  const endOfDay = new Date(Date.UTC(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), inputDate.getUTCDate(), 23, 59, 59, 999));

  const existingBooking = await Booking.findOne({
    courtId: bookingData.courtId,
    slotId: bookingData.slotId,
    bookingDate: { $gte: startOfDay, $lte: endOfDay },
    status: { $ne: 'Cancelled' },
  });

  if (existingBooking) {
    throw new BadRequestError('This slot is already booked for this court and date');
  }

  // Chuẩn hóa giờ lưu vào DB luôn là 00:00:00 UTC của ngày đó
  bookingData.bookingDate = startOfDay;

  // Calculate Price Server-side (SECURITY: Không tin tưởng client)
  const slot = await timeSlotService.findById(bookingData.slotId);
  let totalPrice = slot.price;
  let discountAmount = 0;

  if (bookingData.voucherId) {
    const voucher = await voucherService.findById(bookingData.voucherId);
    if (!voucher.isActive) throw new BadRequestError('Voucher is not active');
    
    // Calculate valid discount
    if (voucher.discountType === 'Percentage') {
      discountAmount = (totalPrice * voucher.discountValue) / 100;
      if (voucher.maxDiscount && discountAmount > voucher.maxDiscount) {
        discountAmount = voucher.maxDiscount;
      }
    } else if (voucher.discountType === 'FixedAmount') {
      discountAmount = voucher.discountValue;
    }
    
    totalPrice -= discountAmount;
    if (totalPrice < 0) totalPrice = 0;
  }

  bookingData.totalPrice = totalPrice;
  bookingData.discountAmount = discountAmount;

  const booking = await Booking.create(bookingData);
  
  // Notify other users in the same court room
  socketService.emitToCourt(bookingData.courtId, 'slot:booked', {
    slotId: bookingData.slotId,
    bookingDate: bookingData.bookingDate,
  });

  return booking;
};

/**
 * Find all bookings
 * @param {Object} query 
 * @returns {Promise<Object>}
 */
const findAll = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const items = await Booking.find().skip(skip).limit(limit);
  const total = await Booking.countDocuments();
  return { items, pagination: { page, limit, total } };
};

/**
 * Find booking by ID
 * @param {string} id 
 * @returns {Promise<Object>}
 */
const findById = async (id) => {
  const booking = await Booking.findById(id);
  if (!booking) throw new BadRequestError('Booking not found');
  return booking;
};

/**
 * Update booking status
 * @param {string} id 
 * @param {string} status 
 * @returns {Promise<Object>}
 */
const updateStatus = async (id, status) => {
  const booking = await Booking.findByIdAndUpdate(id, { status }, { returnDocument: 'after' });
  if (!booking) throw new BadRequestError('Booking not found');

  // Notify realtime
  if (status === 'Confirmed') {
    socketService.emitToCourt(booking.courtId.toString(), 'slot:confirmed', {
      slotId: booking.slotId,
      bookingDate: booking.bookingDate,
    });
  } else if (status === 'Cancelled') {
    socketService.emitToCourt(booking.courtId.toString(), 'slot:released', {
      slotId: booking.slotId,
      bookingDate: booking.bookingDate,
      reason: 'manual_cancellation'
    });
  }

  return booking;
};

/**
 * Update booking information
 * @param {string} id 
 * @param {Object} updateData 
 * @returns {Promise<Object>}
 */
const update = async (id, updateData) => {
  const booking = await Booking.findByIdAndUpdate(id, updateData, { new: true });
  if (!booking) throw new BadRequestError('Booking not found');
  return booking;
};

/**
 * Delete booking
 * @param {string} id 
 * @returns {Promise<void>}
 */
const remove = async (id) => {
  const booking = await Booking.findByIdAndDelete(id);
  if (!booking) throw new BadRequestError('Booking not found');
};

module.exports = {
  create,
  findAll,
  findById,
  updateStatus,
  update,
  remove,
};

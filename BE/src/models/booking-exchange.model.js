const mongoose = require('mongoose');

const bookingExchangeSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    default: 'Open',
    enum: ['Open', 'Completed', 'Cancelled'],
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, { timestamps: true });

// Marketplace: lấy tin pass đang mở, mới nhất trước
bookingExchangeSchema.index({ status: 1, createdAt: -1 });
// Check trùng: 1 booking chỉ có 1 tin Open
bookingExchangeSchema.index({ bookingId: 1, status: 1 });
// Tin pass của seller
bookingExchangeSchema.index({ sellerId: 1, createdAt: -1 });

const BookingExchange = mongoose.model('BookingExchange', bookingExchangeSchema);

module.exports = BookingExchange;

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    default: null,
  },
  courtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court',
    default: null,
  },
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    isRent: {
      type: Boolean,
      default: false,
    },
    returnedQuantity: {
      type: Number,
      default: 0,
      min: 0,
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Completed', 'Cancelled'],
  },
}, { timestamps: true });

// Lịch sử order theo user (mới nhất trước)
orderSchema.index({ userId: 1, createdAt: -1 });
// Order gắn với booking
orderSchema.index({ bookingId: 1 });
// Order gắn với sân
orderSchema.index({ courtId: 1 });
// Lọc theo trạng thái
orderSchema.index({ status: 1, createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

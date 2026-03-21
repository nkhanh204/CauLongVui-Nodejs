const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['MoMo', 'VNPay', 'Cash'],
  },
  transactionRef: {
    type: String,
    default: null,
  },
  gatewayResponse: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Success', 'Failed'],
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Tìm payment theo booking (dùng trong dependency check)
paymentSchema.index({ bookingId: 1, status: 1 });
// Lịch sử thanh toán theo user
paymentSchema.index({ userId: 1, createdAt: -1 });
// Lọc theo trạng thái + phương thức
paymentSchema.index({ status: 1, paymentMethod: 1 });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;

const mongoose = require('mongoose');

const pendingExpirySchema = new mongoose.Schema({
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  expireAt: {
    type: Date,
    required: true,
  },
});

// TTL Index: MongoDB tự động xóa document khi đến thời điểm expireAt
pendingExpirySchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
// Tìm nhanh theo bookingId (dùng khi xóa sau payment success)
pendingExpirySchema.index({ bookingId: 1 });

const PendingExpiry = mongoose.model('PendingExpiry', pendingExpirySchema);

module.exports = PendingExpiry;

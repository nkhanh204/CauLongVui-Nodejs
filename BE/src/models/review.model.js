const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court',
    required: true,
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

// Đánh giá theo sân (mới nhất trước)
reviewSchema.index({ courtId: 1, createdAt: -1 });
// 1 user chỉ review 1 booking (optional unique)
reviewSchema.index({ userId: 1, bookingId: 1 });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

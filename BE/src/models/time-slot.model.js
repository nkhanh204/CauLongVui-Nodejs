const mongoose = require('mongoose');

const timeSlotSchema = new mongoose.Schema({
  startTime: {
    type: String, // Storing as "HH:mm"
    required: true,
  },
  endTime: {
    type: String, // Storing as "HH:mm"
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  isPeakHour: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

module.exports = TimeSlot;

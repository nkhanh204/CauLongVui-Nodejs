const cron = require('node-cron');
const Booking = require('../models/booking.model');
const socketService = require('../services/socket.service');
const dayjs = require('dayjs');

/**
 * Initialize Cleanup Booking Job
 * Runs every minute to cancel Pending bookings older than 10 minutes
 */
const initCleanupJob = () => {
  cron.schedule('* * * * *', async () => {
    const tenMinutesAgo = dayjs().subtract(10, 'minute').toDate();
    
    const expiredBookings = await Booking.find({
      status: 'Pending',
      createdAt: { $lt: tenMinutesAgo }
    });

    if (expiredBookings.length > 0) {
      console.log(`Cleaning up ${expiredBookings.length} expired bookings...`);
      
      for (const booking of expiredBookings) {
        booking.status = 'Cancelled';
        await booking.save();
        
        // Notify realtime
        socketService.emitToCourt(booking.courtId.toString(), 'slot:released', {
          slotId: booking.slotId,
          bookingDate: booking.bookingDate,
          reason: 'timeout'
        });
      }
    }
  });
};

module.exports = {
  initCleanupJob
};

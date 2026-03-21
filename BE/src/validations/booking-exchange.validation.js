const { z } = require('zod');

const createBookingExchangeSchema = z.object({
  body: z.object({
    bookingId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Booking ID'),
  }),
});

module.exports = {
  createBookingExchangeSchema,
};

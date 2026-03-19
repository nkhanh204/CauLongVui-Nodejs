const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const validate = require('../middlewares/validate.middleware');
const { createBookingSchema, updateBookingStatusSchema, updateBookingSchema } = require('../validations/booking.validation');
const { validateApiKey } = require('../middlewares/auth.middleware');

router.get('/', bookingController.getBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/', validate(createBookingSchema), bookingController.createBooking);
router.put('/:id', validate(updateBookingSchema), bookingController.updateBooking);
router.patch('/:id/status', validateApiKey('secret'), validate(updateBookingStatusSchema), bookingController.updateBookingStatus);
router.delete('/:id', validateApiKey('secret'), bookingController.deleteBooking);

module.exports = router;

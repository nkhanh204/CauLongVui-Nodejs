const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const courtRoutes = require('./court.route');
const bookingRoutes = require('./booking.route');
const paymentRoutes = require('./payment.route');
const voucherRoutes = require('./voucher.route');
const timeSlotRoutes = require('./time-slot.route');
const reviewRoutes = require('./review.route');
const fileRoutes = require('./file.route');
const roleRoutes = require('./role.route');
const { validateApiKey } = require('../middlewares/auth.middleware');

// Apply minimal Public Key security to ALL routes
router.use(validateApiKey('public'));

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/courts', courtRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);
router.use('/vouchers', voucherRoutes);
router.use('/time-slots', timeSlotRoutes);
router.use('/reviews', reviewRoutes);
router.use('/files', fileRoutes);
router.use('/roles', roleRoutes);

module.exports = router;

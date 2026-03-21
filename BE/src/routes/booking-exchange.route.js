const express = require('express');
const router = express.Router();
const bookingExchangeController = require('../controllers/booking-exchange.controller');
const validate = require('../middlewares/validate.middleware');
const { createBookingExchangeSchema } = require('../validations/booking-exchange.validation');
const { verifyToken } = require('../middlewares/auth.middleware');

// Public: xem danh sách sân đang pass
router.get('/', bookingExchangeController.getBookingExchanges);
router.get('/:id', bookingExchangeController.getBookingExchangeById);

// Authenticated: đăng tin pass sân
router.post('/', verifyToken, validate(createBookingExchangeSchema), bookingExchangeController.createBookingExchange);

// Authenticated: mua lại sân
router.post('/:id/take', verifyToken, bookingExchangeController.takeBookingExchange);

// Authenticated: hủy tin pass
router.patch('/:id/cancel', verifyToken, bookingExchangeController.cancelBookingExchange);

module.exports = router;

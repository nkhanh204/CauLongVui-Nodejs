const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Tất cả endpoints thống kê yêu cầu đăng nhập
router.use(verifyToken);

router.get('/revenue', statisticsController.getRevenueByMonth);
router.get('/top-courts', statisticsController.getTopCourts);
router.get('/overview', statisticsController.getOverview);
router.get('/payment-methods', statisticsController.getRevenueByPaymentMethod);
router.get('/booking-status', statisticsController.getBookingStatusDistribution);

module.exports = router;

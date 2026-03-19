const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const validate = require('../middlewares/validate.middleware');
const { createPaymentSchema, updatePaymentStatusSchema } = require('../validations/payment.validation');
const { validateApiKey } = require('../middlewares/auth.middleware');

router.get('/', paymentController.getPayments);
router.get('/:id', paymentController.getPaymentById);
router.post('/', validate(createPaymentSchema), paymentController.createPayment);
router.patch('/:id/status', validateApiKey('secret'), validate(updatePaymentStatusSchema), paymentController.updatePaymentStatus);

module.exports = router;

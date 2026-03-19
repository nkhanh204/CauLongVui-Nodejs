const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucher.controller');
const validate = require('../middlewares/validate.middleware');
const { createVoucherSchema, updateVoucherSchema } = require('../validations/voucher.validation');
const { validateApiKey } = require('../middlewares/auth.middleware');

router.get('/', voucherController.getVouchers);
router.get('/:id', voucherController.getVoucherById);
router.post('/', validateApiKey('secret'), validate(createVoucherSchema), voucherController.createVoucher);
router.put('/:id', validateApiKey('secret'), validate(updateVoucherSchema), voucherController.updateVoucher);
router.delete('/:id', validateApiKey('secret'), voucherController.deleteVoucher);

module.exports = router;

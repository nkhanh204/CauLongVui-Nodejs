const express = require('express');
const router = express.Router();
const foodOrderController = require('../controllers/food-order.controller');
const validate = require('../middlewares/validate.middleware');
const { createFoodOrderSchema, updateFoodOrderStatusSchema } = require('../validations/food-order.validation');
const { validateApiKey } = require('../middlewares/auth.middleware');

router.get('/', foodOrderController.getFoodOrders);
router.get('/:id', foodOrderController.getFoodOrderById);
router.post('/', validate(createFoodOrderSchema), foodOrderController.createFoodOrder);

// Status update (Secret key required)
router.patch('/:id/status', validateApiKey('secret'), validate(updateFoodOrderStatusSchema), foodOrderController.updateFoodOrderStatus);

module.exports = router;

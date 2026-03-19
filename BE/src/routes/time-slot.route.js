const express = require('express');
const router = express.Router();
const timeSlotController = require('../controllers/time-slot.controller');
const validate = require('../middlewares/validate.middleware');
const { createTimeSlotSchema } = require('../validations/time-slot.validation');
const { validateApiKey } = require('../middlewares/auth.middleware');

router.get('/', timeSlotController.getTimeSlots);
router.get('/:id', timeSlotController.getTimeSlotById);
router.post('/', validateApiKey('secret'), validate(createTimeSlotSchema), timeSlotController.createTimeSlot);
router.put('/:id', validateApiKey('secret'), timeSlotController.updateTimeSlot);
router.delete('/:id', validateApiKey('secret'), timeSlotController.deleteTimeSlot);

module.exports = router;

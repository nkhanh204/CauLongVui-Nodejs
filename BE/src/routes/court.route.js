const express = require('express');
const router = express.Router();
const courtController = require('../controllers/court.controller');
const validate = require('../middlewares/validate.middleware');
const { createCourtSchema, updateCourtSchema } = require('../validations/court.validation');
const { validateApiKey } = require('../middlewares/auth.middleware');

const upload = require('../middlewares/upload.middleware');

router.get('/', courtController.getCourts);
router.get('/:id', courtController.getCourtById);
router.post('/', validateApiKey('secret'), upload.any(), validate(createCourtSchema), courtController.createCourt);
router.put('/:id', validateApiKey('secret'), upload.any(), validate(updateCourtSchema), courtController.updateCourt);
router.delete('/:id', validateApiKey('secret'), courtController.deleteCourt);

module.exports = router;

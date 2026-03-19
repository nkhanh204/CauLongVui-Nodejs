const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const validate = require('../middlewares/validate.middleware');
const { createRoleSchema } = require('../validations/role.validation');
const { validateApiKey } = require('../middlewares/auth.middleware');

router.get('/', validateApiKey('secret'), roleController.getRoles);
router.get('/:id', validateApiKey('secret'), roleController.getRoleById);
router.post('/', validateApiKey('secret'), validate(createRoleSchema), roleController.createRole);

module.exports = router;

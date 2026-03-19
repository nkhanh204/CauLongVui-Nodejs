const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate.middleware');
const { createUserSchema, updateUserSchema } = require('../validations/user.validation');
const { validateApiKey } = require('../middlewares/auth.middleware');

router.post('/', validate(createUserSchema), userController.createUser);
router.get('/', validateApiKey('secret'), userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', validate(updateUserSchema), userController.updateUser);
router.delete('/:id', validateApiKey('secret'), userController.deleteUser);

module.exports = router;

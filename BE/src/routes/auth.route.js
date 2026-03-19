const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const { loginSchema, createUserSchema } = require('../validations/user.validation');

router.post('/login', validate(loginSchema), authController.login);
router.post('/register', validate(createUserSchema), authController.register);
router.post('/logout', authController.logout);

module.exports = router;

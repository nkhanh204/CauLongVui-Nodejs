const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');
const upload = require('../middlewares/upload.middleware');

router.post('/images', upload.array('images', 10), fileController.uploadImages);
router.post('/avatar', upload.single('avatar'), fileController.uploadAvatar);

module.exports = router;

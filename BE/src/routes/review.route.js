const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const validate = require('../middlewares/validate.middleware');
const { createReviewSchema, updateReviewSchema } = require('../validations/review.validation');

router.get('/court/:courtId', reviewController.getReviewsByCourt);
router.post('/', validate(createReviewSchema), reviewController.createReview);
router.put('/:id', validate(updateReviewSchema), reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;

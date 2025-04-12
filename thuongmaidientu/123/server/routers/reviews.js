import express from 'express';
import { getReviewsByCar, createReview } from '../controllers/reviews.js';

const router = express.Router();

// Get reviews by car ID
router.get('/:carId', getReviewsByCar);

// Create a new review
router.post('/', createReview);

export default router;

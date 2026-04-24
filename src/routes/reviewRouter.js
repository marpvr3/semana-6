import express from 'express';
import { getReviews, saveReview } from '../controllers/reviewController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', authMiddleware, saveReview);

export default router;

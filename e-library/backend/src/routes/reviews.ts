import express, { Request, Response } from 'express';
import Review from '../models/Review';
import { auth, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

// Get reviews for a book
router.get('/book/:bookId', async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find({ book_id: req.params.bookId })
      .populate('user_id', 'name')
      .sort({ reviewed_at: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add Review
router.post('/', auth, async (req: AuthRequest, res: Response) => {
  const { book_id, rating, comment } = req.body;
  try {
    const existing = await Review.findOne({ user_id: req.user!._id, book_id });
    if (existing)
      return res
        .status(400)
        .json({ error: 'You have already reviewed this book' });

    const review = new Review({
      user_id: req.user!._id,
      book_id,
      rating,
      comment,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

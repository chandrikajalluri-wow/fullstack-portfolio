import express, { Response } from 'express';
import Wishlist from '../models/Wishlist';
import { auth, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

// Get My Wishlist
router.get('/', auth, async (req: AuthRequest, res: Response) => {
  try {
    const items = await Wishlist.find({ user_id: req.user!._id }).populate(
      'book_id'
    );
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add to Wishlist
router.post('/', auth, async (req: AuthRequest, res: Response) => {
  const { book_id } = req.body;
  try {
    const existing = await Wishlist.findOne({
      user_id: req.user!._id,
      book_id,
    });
    if (existing) return res.status(400).json({ error: 'Already in wishlist' });

    const item = new Wishlist({ user_id: req.user!._id, book_id });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove from Wishlist
router.delete('/:id', auth, async (req: AuthRequest, res: Response) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed from wishlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

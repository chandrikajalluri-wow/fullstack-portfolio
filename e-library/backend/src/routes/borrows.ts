/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from 'express';
import Borrow from '../models/Borrow';
import Book from '../models/Book';
import { auth, checkRole, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

// Issue a book (User)
router.post('/issue', auth, async (req: AuthRequest, res: Response) => {
  const { book_id, days = 14 } = req.body;
  try {
    const book = await Book.findById(book_id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (book.status !== 'available')
      return res.status(400).json({ error: 'Book is not available' });

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + days);

    const borrow = new Borrow({
      user_id: req.user!._id,
      book_id: book._id,
      return_date: returnDate,
    });
    await borrow.save();

    // Update book status
    try {
      book.status = 'issued';
      await book.save();
    } catch (updateError: any) {
      // Compensation: Delete the borrow record if book update fails
      await Borrow.findByIdAndDelete(borrow._id);
      console.error('Book update failed, reverted borrow:', updateError);
      return res
        .status(500)
        .json({
          error: 'Failed to update book status: ' + updateError.message,
        });
    }

    res.status(201).json(borrow);
  } catch (err: any) {
    console.error('Borrow error:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

router.post('/return/:id', auth, async (req: AuthRequest, res: Response) => {
  try {
    const borrow = await Borrow.findById(req.params.id);
    if (!borrow) return res.status(404).json({ error: 'Record not found' });
    if (borrow.status === 'returned')
      return res.status(400).json({ error: 'Already returned' });

    // Mark returned
    borrow.returned_at = new Date();
    borrow.status = 'returned';

    // Calculate fine (simple logic: $1 per day overdue)
    const now = new Date();
    if (now > borrow.return_date) {
      const diffTime = Math.abs(now.getTime() - borrow.return_date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      borrow.fine_amount = diffDays * 1; // $1 per day
    }

    await borrow.save();

    // Update Book status
    await Book.findByIdAndUpdate(borrow.book_id, { status: 'available' });

    res.json(borrow);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// My Borrows (User)
router.get('/my', auth, async (req: AuthRequest, res: Response) => {
  try {
    const borrows = await Borrow.find({ user_id: req.user!._id })
      .populate('book_id', 'title author cover_image_url')
      .sort({ issued_date: -1 });
    res.json(borrows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// All Borrows (Admin)
router.get(
  '/',
  auth,
  checkRole(['admin']),
  async (req: Request, res: Response) => {
    try {
      const borrows = await Borrow.find()
        .populate('user_id', 'name email')
        .populate('book_id', 'title');
      res.json(borrows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;

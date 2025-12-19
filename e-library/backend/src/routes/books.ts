import express, { Request, Response } from 'express';
import Book from '../models/Book';
import { auth, checkRole, AuthRequest } from '../middleware/authMiddleware';

const router = express.Router();

// Get all books (Public, with filters)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { search, category, genre } = req.query;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = { status: { $ne: 'archived' } };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }
    if (category) query.category_id = category;
    if (genre) query.genre = genre;

    const books = await Book.find(query).populate('category_id', 'name');
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single book
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      'category_id',
      'name'
    );
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create Book (Admin only)
router.post(
  '/',
  auth,
  checkRole(['admin']),
  async (req: AuthRequest, res: Response) => {
    try {
      const book = new Book({
        ...req.body,
        addedBy: req.user!._id,
      });
      await book.save();
      res.status(201).json(book);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Update Book (Admin only)
router.put(
  '/:id',
  auth,
  checkRole(['admin']),
  async (req: Request, res: Response) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!book) return res.status(404).json({ error: 'Book not found' });
      res.json(book);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Delete Book (Admin only)
router.delete(
  '/:id',
  auth,
  checkRole(['admin']),
  async (req: Request, res: Response) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) return res.status(404).json({ error: 'Book not found' });
      res.json({ message: 'Book deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

export default router;

import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import Role from '../models/Role';
import AuthToken from '../models/AuthToken';
import { sendEmail } from '../utils/mailer';
import { IRole } from '../models/Role';

const router = express.Router();

// Signup
router.post('/signup', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Default role = "user"
    const userRole = await Role.findOne({ name: 'user' });
    if (!userRole)
      return res.status(500).json({ error: 'Default role not found' });

    const user = new User({
      name,
      email,
      password: hashed,
      role_id: userRole._id,
    });

    await user.save();
    res.json({ message: 'Signup successful' });
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate('role_id');
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const roleDoc = user.role_id as IRole;
    const token = jwt.sign(
      { id: user._id, role: roleDoc.name },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.json({ token, role: roleDoc.name });
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Forgot Password
router.post('/forgot', async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    // Generate token
    const token = crypto.randomBytes(20).toString('hex');

    // expiry 1 hour
    const expiresAt = new Date(Date.now() + 3600000);

    // Create AuthToken record
    await AuthToken.create({
      user_id: user._id,
      token: token,
      type: 'password_reset',
      expires_at: expiresAt,
    });

    const resetLink = `http://localhost:5173/reset/${token}`;
    await sendEmail(
      email,
      'Password Reset',
      `Click here to reset: ${resetLink}`
    );

    res.json({ message: 'Reset link sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Reset Password
router.post('/reset/:token', async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    // Find valid unused token
    const authToken = await AuthToken.findOne({
      token: token,
      type: 'password_reset',
      used: false,
      expires_at: { $gt: Date.now() },
    });

    if (!authToken)
      return res.status(400).json({ error: 'Invalid or expired token' });

    // Find user
    const user = await User.findById(authToken.user_id);
    if (!user) return res.status(400).json({ error: 'User not found' });

    // Update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Mark token as used
    authToken.used = true;
    await authToken.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

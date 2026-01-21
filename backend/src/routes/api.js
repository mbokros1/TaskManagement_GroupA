import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;

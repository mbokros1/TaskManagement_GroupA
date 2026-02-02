import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// post
router.post('/', verifyToken, (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

// get
router.get('/:id', verifyToken, (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

// patch
router.patch('/:id', verifyToken, (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

// delete
router.delete('/:id', verifyToken, (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export default router;

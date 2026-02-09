import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { validateTicketListQuery } from '../middleware/validateTicketListQuery.js';

const router = express.Router();

router.get('/', verifyToken, validateTicketListQuery, (req, res) => {
  res.json({
    ok: true,
    message: 'Ticket list endpoint reached successfully',
    query: req.query
  });
});

export default router;

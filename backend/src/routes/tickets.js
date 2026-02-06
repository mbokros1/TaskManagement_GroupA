import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
const ticketsController = require('../controllers/tickets.controller');

router.use(verifyToken);

// post
router.post('/', ticketsController.createTicket);

// get by ID
router.get('/:id', ticketsController.getTicketByID);

// patch
router.patch('/:id', ticketsController.updateTicket);

// delete
router.delete('/:id', ticketsController.deleteTicket);

export default router;

import express from 'express';

const router = express.Router();
const ticketsController = require('../controllers/tickets.controller');

// post
router.post('/', ticketsController.createTicket);

// get by ID
router.get('/:id', ticketsController.getTicketByID);

// patch
router.patch('/:id', ticketsController.updateTicket);

// delete
router.delete('/:id', ticketsController.deleteTicket);

export default router;

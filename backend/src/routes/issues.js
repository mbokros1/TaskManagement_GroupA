import express from 'express';
import { issueController } from '../controllers/issuesController.js';

const router = express.Router();

// post
router.post('/', issueController.createIssue);

// get by ID
router.get('/:id', issueController.getIssueByID);

// patch
router.patch('/:id', issueController.updateIssue);

// delete
router.delete('/:id', issueController.deleteIssue);

export default router;

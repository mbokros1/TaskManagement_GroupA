import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Health check
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

/**
 * @openapi
 * /api/me:
 *   get:
 *     summary: Get current user profile
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     sub:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *                     preferred_username:
 *                       type: string
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 *       401:
 *         description: Missing or invalid token
 */
router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;

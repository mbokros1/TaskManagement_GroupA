import express from 'express';
import { Op } from 'sequelize';
import { User } from '../models/models.js';

const router = express.Router();

/**
 * @openapi
 * /api/users/search:
 *   get:
 *     summary: Search users (for assignee picker)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search term (name or email)
 *     responses:
 *       200:
 *         description: Matching users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 required: [id, fullName, role, timezone]
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   fullName:
 *                     type: string
 *                   email:
 *                     type: string
 *                     nullable: true
 *                   role:
 *                     type: string
 *                     example: developer
 *                   timezone:
 *                     type: string
 *                     example: UTC
 *             example:
 *               - id: "7f2c1e12-9d0a-4b1e-9e9c-1a2b3c4d5e6f"
 *                 fullName: "Test Admin"
 *                 email: "testadmin@example.com"
 *                 role: "admin"
 *                 timezone: "America/Los_Angeles"
 *       401:
 *         description: Unauthorized
 */
router.get('/search', async (req, res, next) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) return res.json([]);

    const users = await User.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${q}%` } },
          { lastName: { [Op.iLike]: `%${q}%` } },
          { email: { [Op.iLike]: `%${q}%` } },
        ],
      },
      limit: 20,
      order: [['lastName', 'ASC']],
      attributes: ['id', 'firstName', 'lastName', 'email', 'role', 'timezone'],
    });

    const safe = users.map((u) => ({
      id: u.id,
      fullName: `${u.firstName} ${u.lastName}`.trim(),
      email: u.email,
      role: u.role,
      timezone: u.timezone,
    }));
    res.json(safe);
  } catch (err) {
    next(err);
  }
});

export default router;

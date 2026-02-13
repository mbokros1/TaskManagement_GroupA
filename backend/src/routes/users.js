import express from 'express';
import { Op } from 'sequelize';
import { User } from '../models/models.js';

const router = express.Router();

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

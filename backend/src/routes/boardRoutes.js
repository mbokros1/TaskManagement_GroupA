import { Router } from 'express';
import taskRoutes from './taskRoutes.js';

const router = Router({ mergeParams: true });

router.get('/', (req, res) => {
  const { _projectId } = req.params;
  res.json([{ id: 1 }, { id: 2 }]);
});

router.use('/:boardId/tasks', taskRoutes);

export default router;

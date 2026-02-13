import { Router } from 'express';
import boardRoutes from './boardRoutes.js';
const router = Router();

router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Task Manager' },
    { id: 2, name: 'VR Headset' },
  ]);
});

router.use('/:projectId/boards', boardRoutes);

export default router;

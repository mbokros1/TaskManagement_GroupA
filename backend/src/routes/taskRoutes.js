import { Router } from 'express';

const router = Router({ mergeParams: true });

let tasks = [
  {
    id: 0,
    title: 'Finish this',
    status: 'todo',
    storyPoints: 10,
  },
  {
    id: 1,
    title: 'Fix api',
    status: 'todo',
    storyPoints: 0,
  },
];

router.get('/', (req, res) => {
  const { _projectId, _boardId } = req.params;
  res.json(tasks);
});

router.patch('/:taskId', (req, res) => {
  const { taskId } = req.params;
  tasks[taskId] = { ...tasks[taskId], ...req.body };
  res.sendStatus(200);
});
export default router;

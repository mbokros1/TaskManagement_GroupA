import { Box, TextField } from '@mui/material';
import { useInlineEdit } from '../../hooks/useInlineEdit';
import { useTasks } from '../../context/TasksContext';

export default function StoryPoints({ taskId, points }) {
  const { updateTask, updatingIds } = useTasks();

  const editProps = useInlineEdit(points, (val) => {
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      updateTask(taskId, { storyPoints: parsed });
    }
  });

  return (
    <Box
      sx={{
        bgcolor: '#f0f0f0',
        px: 0.5,
        py: 0.125,
        borderRadius: 0.5,
        minWidth: 20,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TextField
        {...editProps}
        variant="filled"
        disabled={updatingIds.has(taskId)}
        inputMode="numeric"
        fontSize="0.65rem"
      />
    </Box>
  );
}

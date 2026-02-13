import { Box, Input } from '@mui/material';
import { useTasks } from '../../context/TasksContext';
import { useInlineEdit } from '../../hooks/useInlineEdit';

export default function StoryPoints({ taskId, points }) {
  const { updateTask, updatingIds } = useTasks();
  const isUpdating = updatingIds.has(taskId);

  const editProps = useInlineEdit(points, (val) => {
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      updateTask(taskId, { storyPoints: parsed });
    }
  });

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#dfe1e6',
        color: '#172b4d',
        borderRadius: '3px',
        minWidth: '5px',
        width: '2.5ch',
        height: '20px',
        px: 0.5,
        transition: 'all 0.1s ease-in-out',
        '&:hover': {
          bgcolor: '#ebecf0',
        },
        '&:focus-within': {
          bgcolor: '#fff',
          boxShadow: '0 0 0 2px #4c9aff inset',
        },
      }}
    >
      <Input
        {...editProps}
        inputProps={{
          pattern: '[0-9]*',
        }}
        disableUnderline
        disabled={isUpdating}
        inputMode="numeric"
        sx={{
          fontSize: '11px',
          fontWeight: 700,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          '& input': {
            padding: 0,
            textAlign: 'center',
            cursor: 'pointer',
          },
        }}
      />
    </Box>
  );
}

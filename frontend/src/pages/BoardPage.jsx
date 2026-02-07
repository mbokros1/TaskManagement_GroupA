import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  Person as PersonIcon,
  KeyboardArrowDown as ArrowDownIcon,
  EditOutlined as EditIcon,
  Circle as CircleIcon,
  Pentagon as PentagonIcon,
  AccountTreeOutlined as NestingIcon,
} from '@mui/icons-material';
import {
  tasks as initialTasks,
  columns,
  boardInfo,
  TASK_TYPES,
  STATUSES,
} from '../data/mockBoardData.js';

// Custom rhombus icon for subtasks
function RhombusIcon({ sx }) {
  return (
    <Box
      sx={{
        width: 8,
        height: 8,
        bgcolor: '#F5A623',
        transform: 'rotate(45deg)',
        ...sx,
      }}
    />
  );
}

// Get icon and color based on task type
function getTaskTypeIcon(type) {
  switch (type) {
    case TASK_TYPES.EPIC:
      return (
        <Tooltip title="Epic" arrow>
          <CircleIcon sx={{ fontSize: 14, color: '#E91E8C' }} />
        </Tooltip>
      );
    case TASK_TYPES.STORY:
      return (
        <Tooltip title="Story" arrow>
          <PentagonIcon sx={{ fontSize: 14, color: '#00B8D9' }} />
        </Tooltip>
      );
    case TASK_TYPES.SUBTASK:
      return (
        <Tooltip title="Sub-task" arrow>
          <Box component="span" sx={{ display: 'inline-flex' }}>
            <RhombusIcon />
          </Box>
        </Tooltip>
      );
    default:
      return <CircleIcon sx={{ fontSize: 14, color: '#999' }} />;
  }
}

// Task Card Component
function TaskCard({ task }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 1.5,
        bgcolor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      }}
    >
      {/* Title and Edit Icon */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: '#333', pr: 1 }}
        >
          {task.title}
        </Typography>
        <IconButton size="small" sx={{ color: '#ccc', p: 0.25 }}>
          <EditIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      {/* Description */}
      <Typography
        variant="body2"
        component="p"
        sx={{
          color: '#666',
          fontSize: '0.8rem',
          lineHeight: 1.4,
          mb: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          paddingLeft: '0 !important',
          marginLeft: '0 !important',
          textIndent: '0 !important',
          textAlign: 'left',
        }}
      >
        {task.description}
      </Typography>

      {/* Footer: Task ID, Story Points, Assignee */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Task Type Icon and ID */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          {getTaskTypeIcon(task.type)}
          <Typography variant="caption" sx={{ color: '#888' }}>
            {task.id}
          </Typography>
        </Box>

        {/* Story Points, Nesting Icon, and Assignee */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
            <Typography
              variant="caption"
              sx={{ fontWeight: 500, color: '#555', fontSize: '0.65rem' }}
            >
              {task.storyPoints}
            </Typography>
          </Box>
          {(task.type === 'epic' || task.type === 'story') && (
            <NestingIcon sx={{ fontSize: 16, color: '#ccc' }} />
          )}
          <Tooltip title={task.assignee || 'Unassigned'} arrow>
            <IconButton size="small" sx={{ color: '#ccc', p: 0.25 }}>
              <PersonIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
}

// Column Component
function Column({ column, tasks }) {
  const columnTasks = tasks.filter((task) => task.status === column.id);
  const taskCount = columnTasks.length;

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 280,
        maxWidth: 320,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Column Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          px: 0.5,
          py: 0.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 500, color: '#333' }}
          >
            {column.title}
          </Typography>
          <Typography variant="caption" sx={{ color: '#888' }}>
            {taskCount}
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: '#999' }}>
          <AddIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Task Cards */}
      <Box
        sx={{
          flex: 1,
          bgcolor: '#f5f5f5',
          borderRadius: 1,
          p: 1.5,
          minHeight: 200,
        }}
      >
        {columnTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>
    </Box>
  );
}

export default function BoardPage() {
  const [tasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#fafafa',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: 3,
          py: 3,
        }}
      >
        {/* Board Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 3,
          }}
        >
          {/* Title and Date */}
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: 400, color: '#333', mb: 0.5 }}
            >
              {boardInfo.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#888' }}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Typography>
          </Box>

          {/* Search, Filter, Create Task */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <TextField
              placeholder="Search tasks..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: 220,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#999' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              sx={{
                borderColor: '#ddd',
                color: '#555',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#bbb',
                  bgcolor: 'white',
                },
              }}
            >
              Filter
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: '#333',
                color: 'white',
                textTransform: 'uppercase',
                fontWeight: 500,
                '&:hover': {
                  bgcolor: '#444',
                },
              }}
            >
              Create Task
            </Button>
          </Box>
        </Box>

        {/* Kanban Columns */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 2,
          }}
        >
          {columns.map((column) => (
            <Column key={column.id} column={column} tasks={tasks} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
